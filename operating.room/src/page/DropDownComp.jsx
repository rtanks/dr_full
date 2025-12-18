import Patient from "../components/Patient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HeaderAuth from "../services/api/headerAndUrlService";
import registerRequestService from "../services/api/registerRequestService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatients, getPatientsMain } from "../slices/userSlice";

export default function DropDownComp({doctors, getDataPatient, getDoctorFilter }) {
  const { updateRequestMutation, } = registerRequestService();
  const { baseUrl, headers } = HeaderAuth();
  const dispatch = useDispatch();
  const patients = useSelector(state => state.patients.patients);

  console.log(doctors)
  // const [columns, setColumns] = useState([...doctors]);

  const [patientsByDoctor, setPatientsByDoctor] = useState({});

  const { data, isPending, isLoading } = useQuery({
    queryKey: ["recoveryRequests"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/requests/type/recovery`, {
        headers,
      });
      return response.data;
    },
  });

  useEffect(() => {
    if(data) {
      dispatch(getPatients({patients: data}))
      dispatch(getPatientsMain({patients: data}))
    }
  }, [data])
 
  // گروه‌بندی بیماران بعد از لود
  useEffect(() => {
    if (patients) {
      const grouped = {};
      patients.forEach((p) => {
        const doctor = p.request.request.doctor || "";
        if (!grouped[doctor]) grouped[doctor] = [];
        grouped[doctor].push(p);
      });
      setPatientsByDoctor(grouped);
    }
  }, [patients]);

  const counter = (doctor) => {
    if (!patientsByDoctor[doctor]) return 0;
    return patientsByDoctor[doctor].length;
  };

  // -------------------------------
  // کارت های بیمار — Drag & Drop
  // -------------------------------
  const handleCardDragStart = (e, id, doctor) => {
    e.dataTransfer.setData("cardId", id);
    e.dataTransfer.setData("fromDoctor", doctor);
    e.currentTarget.classList.add("dragging");
  };

  const handleCardDragEnd = (e) => {
    e.currentTarget.classList.remove("dragging");
  };

  const getDragAfterElement = (container, y) => {
    const cards = [
      ...container.querySelectorAll(".patient-card:not(.dragging)"),
    ];

    return cards.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  };

  const handleCardDrop = (e, doctor) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    const fromDoctor = e.dataTransfer.getData("fromDoctor");
    if (!cardId) return;
    const container = e.currentTarget;
    const afterElement = getDragAfterElement(container, e.clientY);
    const newList = { ...patientsByDoctor };
    // حذف از لیست قبلی
    const movedCard = newList[fromDoctor].find(
      (c) => c.request._id === cardId
    );
    newList[fromDoctor] = newList[fromDoctor].filter(
      (c) => c.request._id !== cardId
    );
    // اضافه کردن به ستون جدید
    if (!newList[doctor]) newList[doctor] = [];
    if (!afterElement) {
      newList[doctor].push(movedCard);
    } else {
      const nextId = afterElement.dataset.id;
      const idx = newList[doctor].findIndex(
        (c) => c.request._id === nextId
      );
      newList[doctor].splice(idx, 0, movedCard);
    }

    // آپدیت state
    setPatientsByDoctor(newList);
    // آپدیت دکتر در سرور
    updateRequestMutation.mutate({
      id: cardId,
      data: { doctor },
    });
  };

  // -------------------------------
  // Drag ستون‌ها
  // -------------------------------
  const handleColumnDragStart = (e) => {
    const column = e.currentTarget.closest(".column");
    column.setAttribute("draggable", "true");
    const index = column.dataset.index;
    e.dataTransfer.setData("colIndex", index);
  };

  const handleColumnDragEnd = (e) => {
    const column = e.currentTarget.closest(".column");
    column.removeAttribute("draggable");
  };

  const handleColumnDrop = (e, index) => {
    const from = e.dataTransfer.getData("colIndex");
    if (from === "" || from == null) return;
    const list = [...doctors];
    const moved = list.splice(from, 1)[0];
    list.splice(index, 0, moved);
    // setColumns(list);
    getDoctorFilter(list)
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;
  return (
    <main className="p-5" onDragOver={(e) => e.preventDefault()}>
    <div className="mb-3">
      <div className="small-muted text-[15px]">
        <strong>ستون بیماران در سمت راست ثابت است. ستون پزشکان (باقی ستون‌ها) و کارت‌های بیمار قابل جابجایی هستند.</strong>
      </div>
    </div>
      <div className="board-wrap" id="board">
        {doctors.map((doctor, index) => (
          <div className="column" key={index} data-index={index}
            onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleColumnDrop(e, index)}>
            <div className="col-header">
              <div className="col-title">
                <strong>{doctor || "بیماران"}</strong>
                <span className="count">{counter(doctor)} بیمار</span>
              </div>

              {/* فقط این دکمه ستون را قابل Drag می‌کند */}
              {doctor !== "" && (
                <div className="col-drag-btn" draggable="true" onDragStart={handleColumnDragStart}
                  onDragEnd={handleColumnDragEnd}>≡</div>
              )}
            </div>

            <div title={doctor} className="patients" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleCardDrop(e, doctor)}>
              {patientsByDoctor[doctor]?.map((patient) => (
                <div key={patient.request._id} data-id={patient.request._id} className="patient-card" draggable="true"
                  onDragStart={(e) => handleCardDragStart( e, patient.request._id, doctor )} onDragEnd={handleCardDragEnd}>
                  <Patient getDataPatient={getDataPatient} id={patient.request._id} info={patient} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
