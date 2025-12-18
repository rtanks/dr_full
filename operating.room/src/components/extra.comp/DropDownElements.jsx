import Patient from "../Patient";
import {useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios'
import HeaderAuth from "../../services/api/headerAndUrlService";
import registerRequestService from "../../services/api/registerRequestService";
import { useEffect, useState } from "react";

export default function DropDownElements({getDataPatient}) {
    const [patientsByDoctor, setPatientsByDoctor] = useState({});
    const {updateRequestMutation} = registerRequestService();
    const {baseUrl, headers} = HeaderAuth();
    const queryClient = useQueryClient();
    const columns = ["محمد نظری نسب","امیر آخشی","داریوش بهرامی","امیر حسنوند","مصطفی حسینیان"];
    const {data, isPending, isLoading} = useQuery({queryKey:['recoveryRequests'], 
        queryFn: async () => {
        const response = await axios.get(`${baseUrl}/requests/type/recovery`, {headers});
        console.log(response.data);
        return response.data;
    }})
    const filterUsers = (doctorName) => {
        console.log(data);
        if(!isPending){
            const filtered = data.filter(item => item.request.request.doctor == doctorName);
            return filtered;
        } else {
            return []
        }
    } 
    const counter = (doctorName) => {
        if(!isPending){
            const filtered = data.filter(item => item.request.request.doctor == doctorName);
            console.log(filtered)
            return filtered.length;
        } else {
            const filtered = data.filter(item => item.request.request.doctor == "");
            console.log(filtered)
            return filtered.length;
        }
    } 
    const onDrop = (e) => {
        const id = e.dataTransfer.getData('text');
        e.preventDefault();
        e.target.appendChild(document.getElementById(id))
        updateRequestMutation.mutate({id, data:{doctor: e.target.title}})
        location.reload();
    }
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

    const handleColumnDrop = (e, index, columns, setColumns) => {
      const from = e.dataTransfer.getData("colIndex");
      if (from === "" || from == null) return;

      const list = [...columns];
      const moved = list.splice(from, 1)[0];
      list.splice(index, 0, moved);

      setColumns(list);
    };
    useEffect(() => {
      if (data) {
        const grouped = {};
        data.forEach((p) => {
          const doctor = p.request.request.doctor;
          if (!grouped[doctor]) grouped[doctor] = [];
          grouped[doctor].push(p);
        });
        setPatientsByDoctor(grouped);
      }
    }, [data]);
    const handleCardDragStart = (e, id, doctor) => {
      e.dataTransfer.setData("cardId", id);
      e.dataTransfer.setData("fromDoctor", doctor);
    };
    const getDragAfterElement = (container, y) => {
      const cards = [...container.querySelectorAll(".patient-card:not(.dragging)")];
        
      return cards.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
    
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
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
      const movedCard = newList[fromDoctor].find((c) => c.request._id === cardId);
      newList[fromDoctor] = newList[fromDoctor].filter((c) => c.request._id !== cardId);
        
      // اضافه به لیست فعلی
      if (!newList[doctor]) newList[doctor] = [];
        
      if (afterElement == null) {
        newList[doctor].push(movedCard);
      } else {
        const nextId = afterElement.dataset.id;
        const idx = newList[doctor].findIndex((c) => c.request._id === nextId);
        newList[doctor].splice(idx, 0, movedCard);
      }
    
      setPatientsByDoctor(newList);
    };
    
           
    if(isLoading) return <p>isLoading...</p>
    return (
        <main onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleCardDrop(e, doctor)}>
            <div className="mt-3">
                <div className="small-muted text-[15px]">
                    <strong>ستون بیماران در سمت راست ثابت است. ستون پزشکان (باقی ستون‌ها) و کارت‌های بیمار قابل جابجایی هستند.</strong>
                </div>
            </div>
            <div className="board-wrap" id="board" tabIndex="0" aria-label="تابلو نوبت‌ها">
                <div className="column">
                    <div className="col-header">
                        <div className="col-title">
                            <strong>بیماران</strong>
                            <span className="count">{counter('')} بیمار</span>
                        </div>
                    </div>
                    <div title={''} onDragOver={(e) => {e.preventDefault();e.target.classList.add('drop-over');}} 
                        onDrop={(e) => onDrop(e)} className="patients" onDragEnter={(e) => e.target.parentElement.classList.add('drop-highlight')}
                        onDragLeave={(e) => e.target.parentElement.classList.remove('drop-highlight')}>
                        {   
                            filterUsers( "" ).map(patient => (
                                <Patient getDataPatient={getDataPatient} key={patient.request._id} id={patient.request._id} info={patient}/>
                            ))
                        }
                    </div>
                </div>
                {
                    columns.map((doctor, index) => (
                        <div className="column" key={index} data-index={index} onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleColumnDrop(e, index, columns, setColumns)}>
                            <div className="col-header">
                                <div className="col-title">
                                    <strong>{doctor}</strong>
                                    <span className="count">{counter(doctor)} بیمار</span>
                                </div>
                                <div className="col-drag-btn" draggable="true" onDragStart={handleColumnDragStart}
                                    onDragEnd={handleColumnDragEnd}>≡</div>
                            </div>
                            
                            <div title={doctor} onDragOver={(e) => {e.preventDefault();e.currentTarget.classList.add('drop-over')}} 
                            onDrop={(e) => onDrop(e)} className="patients" onDragEnter={(e) => e.currentTarget.parentElement.classList.add('drop-highlight')}
                            onDragLeave={(e) => e.currentTarget.parentElement.classList.remove('drop-highlight')}>
                                {
                                    filterUsers( doctor ).map(patient => (
                                        <Patient getDataPatient={getDataPatient} key={patient.request._id} id={patient.request._id} info={patient}/>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}