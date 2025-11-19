import React from 'react'
import DeActive from '../../assets/images/Group 3506.png'
import Active from '../../assets/images/Group 3505.png'
import useRequestTools from '../../services/hook/useRequestTools'

const Choice = ({ Data, onSelect, disabled = false, active }) => {
    const {getDataFromStepTwo} = useRequestTools()
    const handleClick = (id, place) => {
        if (disabled) return
        onSelect(id)
        getDataFromStepTwo({center: place})
    }

    return (
        <div className='w-[90%] mx-auto'>
            {Data.map(item => (
                <div key={item.id} className="flex items-center gap-4 my-10">
                    <img
                        onClick={() => handleClick(item.id, item.title)}
                        src={active === item.id ? Active : DeActive}
                        alt={item.title}
                        className={disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    />
                    <div className={disabled ? 'opacity-50' : ''}>
                        <div className='text-bold vazir-medium text-[16px]'>{item.title}</div>
                        <div className='text-bold vazir-medium mt-2 text-[#757575] text-[14px]'>{item.des1}</div>
                        <div className='text-bold vazir-medium my-2 text-[#757575] text-[14px]'>{item.des3}</div>
                        <div className='text-bold vazir-medium text-[#757575] text-[14px]'>{item.des2}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Choice
