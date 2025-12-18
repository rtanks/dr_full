import { CtScanIcon, DoctorICon, GraphIcon, MedicineIcon, MriIcon, PhysiotherapyIcon, StripTestIcon, TestIcon, TransportIcon, UltrasoundIcon } from '../../layout/Icons';
import { HiOutlineUserCircle } from "react-icons/hi2";

export default function useGetIcon() {
    const getIconForHeader = (size, color, key) =>{
        switch(key) {
            case 'mri': return (<MriIcon size={size} color={color}/>)
            case 'graph': return (<GraphIcon size={size} color={color}/>)
            case 'ct-scan': return (<CtScanIcon size={size} color={color}/>)
            case 'ultrasound': return (<UltrasoundIcon size={size} color={color}/>)
            case 'strip-test': return (<StripTestIcon size={size} color={color}/>)
            case 'physiotherapy': return (<PhysiotherapyIcon size={size} color={color}/>)
            case 'test': return (<TestIcon size={size} color={color}/>)
            case 'medicine': return (<MedicineIcon size={size} color={color}/>)
            case 'transport': return (<TransportIcon size={size} color={color}/>)
            case 'visit-doctor': return (<DoctorICon size={size} color={color}/>)
            case 'profile': return (<HiOutlineUserCircle size={size} color={color}/>)
        }
    }
    return{getIconForHeader}
}