import doctorManagementService from "../../services/api/doctorManagementService"
import SearchDoctor from "./SearchDoctor";

export default function ManagementDoctors({doctors,close}) {
    const {updateActivateMutation, deleteDoctorMutation} = doctorManagementService();
    const changeActiveStatus = (id, status) => {
      console.log({id, status})
      updateActivateMutation.mutate({id,status})
    }
    const deleteDoctor = (id) => {
      deleteDoctorMutation.mutate({id})
    }
    return (
        <div onClick={close} className="w-full h-full flex justify-center absolute left-0 top-0 px-5 sm:px-0 bg-[#0009] z-50">
            <div onClick={(e) => e.stopPropagation()} className="modal mt-10" role="dialog" style={{width: '520px'}} aria-modal="true" aria-labelledby="doctorModalTitle">
              <h2 className="font-bold py-5 text-xl" id="doctorsModalTitle">مدیریت ستون‌های پزشکان</h2>
              <div className="modal-body" id="doctorsModalBody">
                {/* <div className="mb-[15px] flex gap-2.5">
                  <input type="text" id="newDoctorName" placeholder="نام پزشک جدید" style={{flex:1}}/>
                  <button className="btn primary h-10 py-1.5 px-2.5 font-old" id="addDoctorBtn">+ افزودن</button>
                </div> */}
                <SearchDoctor/>

                <div id="doctorsList" className="meds-list" style={{marginTop:0, border:'1px solid var(--card-border)', padding:'10px', borderRadius:'8px'}}>
                
                <div className="med-item flex justify-between items-center" data-col-id="col_vdf692i">
                  <span style={{fontWeight:700}}>بیماران</span>
                  <span style={{color:'#94a3b8'}}>(ستون اصلی)</span>
                </div>
                {
                  doctors ? (
                    doctors.map( doctor => (
                      <div key={doctor.id} className={`med-item flex justify-between items-center`} data-col-id="col_09tvmnq">
                        <span className="font-bold">{doctor.fullName}</span>
                          <div className="w-max h-max flex flex-row gap-5 items-center">
                            <div className={`flex border ${!doctor.activate? "justify-start bg-gray-200 border-gray-300" 
                            : "justify-end bg-select-container border-select"} gap-2 w-12 h-7 p-[1.4px] rounded-full `}>
                              <div onClick={() => changeActiveStatus(doctor.id, doctor.activate)} 
                              className={`w-6 h-6 ${!doctor.activate? "bg-gray-400" : "bg-select"} rounded-full`}></div>
                            </div>
                            <button onClick={() => deleteDoctor(doctor.hospitalId)} type="button" className="text-[19px] flex justify-center items-center w-max h-max">✕</button>
                          </div>
                      </div>
                    ))
                  ) : (
                    ""
                  )
                }
                
                </div>
                    <div className="small-muted mt-2.5">ستون **بیماران** (ردیف اول) قابلیت حذف و جابجایی ندارد.</div>
                </div>
                <div className="modal-actions">
                  <button onClick={() => close()} className="btn primary" id="closeDoctorsModal" style={{minWidth:"160px"}}>ذخیره و بستن</button>
                </div>
            </div>
        </div>
    )
}