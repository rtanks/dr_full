import registerRequestService from "../services/api/registerRequestService";
import AddMedicineH from "./AddMedicineH";
import SelectDate from "./SelectDate";
import {useForm, Watch} from 'react-hook-form';
import Calender from '../components/general/date.picker/Calender'
import SetCities from '../components/general/SetCity'
import SetProvinces from '../components/general/SetProvinces'
import { useState } from "react";

export default function RegisterInfoModal({close}) {
    const [modal, setModal] = useState(false);
    const [province, setProvince] = useState({
      id: 25,
      name: "لرستان",
      slug: "لرستان",
      tel_prefix: "066",  
    });
    const {register,watch, handleSubmit, setValue} = useForm()
    const getValue = (key, value) => {
      // console.log(value)
        setValue(key, value)
    }
    const [medicineSelected, setMedicineSelected] = useState([])
    const getMedicineSelected = (value) => {
      console.log(value)
      setMedicineSelected(value);
    }
    const {createRequestMutation} = registerRequestService()
    const onSubmit = (data) => {
        console.log({...data, medicine: medicineSelected.filter(item => item.name != '')});
        
        createRequestMutation.mutate({
          user: {fullName: data.fullName, nationalCode: data.nationalCode, phoneNumber: data.phoneNumber, 
            province: data.province, city: data.city, birthday: data.birthday}, 
          request:{service: 'ویزیت پزشک', type: 'recovery', medicine: medicineSelected.filter(item => item.name != ''), 
            dateRefer: data.dateRefer, explain: data.explain}});
    }
  
    return (
        <div onClick={close} className="w-full h-full flex justify-center absolute left-0 top-0 bg-[#0009] z-50">
            <div onClick={(e) => e.stopPropagation()} className="w-max h-max flex justify-center mt-10" aria-modal="true" aria-labelledby="modalTitle">
                <form onSubmit={handleSubmit(onSubmit)} className="modal">
                    <h2 className="text-2xl font-bold pb-2 pt-5" id="modalTitle">ایجاد بیمار جدید</h2>
                    <div className="modal-body scroll-show" id="modalBody">
                      <div className="form-grid mt-[10px]">
                        <div style={{gridColumn:"1 / -1"}}>
                          <div className="row-three">
                            <div>
                                <label>نام و نام خانوادگی</label>
                                <input {...register("fullName")} type="text" id="fullName" placeholder="مثال: علی رضایی" />
                            </div>
                            <div>
                                <label>شماره تماس</label>
                                <input {...register("phoneNumber")} type="text" id="phone" maxLength={11} 
                                    placeholder="09xxxxxxxx" inputMode="numeric" pattern="[0-9]*" />
                            </div>
                            <div>
                                <label>کد ملی</label>
                                <input {...register("nationalCode")} type="text" maxLength={10} id="nationalId" 
                                    placeholder="کد ملی" inputMode="numeric" pattern="[0-9]*" />
                            </div>
                            <div>
                                <SetProvinces setData={getValue} setProvince={setProvince}
                                    province={province.name} style={'w-full'}/>
                            </div>
                            <div>
                                <SetCities setData={getValue} province={province}
                                    style={'w-full'} />
                            </div>
                            <div>
                              <Calender
                                initialDate={watch('birthday')} placeholder={'تاریخ تولد'}
                                getDate={(val) =>getValue('birthday', val)} style={'w-full'}/>
                            </div>
                          </div>
                        </div>

                        <div style={{gridColumn: "1 / -1"}}>
                          <label>تاریخ مراجعه (انتخاب با دکمه عددی: تعداد روز بعد)</label>
                          <div className="days-grid" id="daysGrid"></div>
                            <SelectDate getValue={getValue}/>
                          <div className="small-muted mt-2">مثال: انتخاب 3 یعنی مراجعه 3 روز بعد از امروز</div>
                        </div>

                        <div style={{gridColumn: "1 / -1"}}>
                          <AddMedicineH getMedicineSelected={getMedicineSelected} medicineSelected={medicineSelected}/>
                        </div>
                        <div style={{gridColumn: "1 / -1"}}>
                          <label>توضیحات</label>
                          <textarea {...register('explain')} id="notes" className="w-full" placeholder="توضیحات..."></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="modal-actions">
                      <button type="button" onClick={() => close()} className="btn" id="cancelModal">انصراف</button>
                      <button type="submit" className="btn primary" id="savePatientBtn">ذخیره</button>
                    </div>
                </form>
            </div>
        </div>
    )
}