import { useEffect, useState } from "react";

export default function MedicineItem({onChangeMedicine, medicine, deleteMedicine}) {
    const freqOptions = [
      {v: 1, t:'1 — یک‌بار در روز'},
      {v: 2, t:'2 — دو بار در روز'},
      {v: 3, t:'3 — سه بار در روز'},
      {v: 4, t:'4 — چهار بار در روز'},
      {v: 0.5, t:'0.5 — یک روز در میان'}
    ];
    return (
        <div className="med-row">
            <input className="med-name" onChange={(e) => onChangeMedicine(medicine.id, 'name', e.target.value)} value={medicine.name} placeholder="نام دارو"/>
            {
                medicine.doseArray ? (
                    <select className="med-dose" onChange={(e) => onChangeMedicine(medicine.id,'dose', e.target.value)} value={medicine.dose} style={{width: "160px"}}>
                        {
                            medicine.doseArray.map((item,index) => (
                                <option key={index}>{item} میلی گرم</option>
                            ))
                        }
                    </select>
                ) : (
                    <input className='med-dose' onChange={(e) => onChangeMedicine(medicine.id,'dose', e.target.value)} 
                    value={medicine.dose} placeholder='دوز (مثال: 500 میلی گرم)' style={{width: "160px"}}/>
                )
            }
            <input type="number" onChange={(e) => onChangeMedicine(medicine.id, 'count', e.target.value)} placeholder="تعداد" min="1" 
                className="med-count" value={medicine.count} style={{width: "100px"}}/>

            <select className="med-freq" onChange={(e) => onChangeMedicine(medicine.id,'freq', e.target.value)} 
                value={medicine.freq} style={{width: '180px'}}>
                {
                    freqOptions.map(opt => (
                        <option key={opt.t} value={opt.v}>{opt.t}</option>
                    ))
                }
            </select>

            <button onClick={() => deleteMedicine(medicine.id)} type="button" className='del-med-btn' title='حذف دارو'>✕</button>
        </div>
    )
}