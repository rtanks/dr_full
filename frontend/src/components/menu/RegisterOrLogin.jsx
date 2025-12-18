import { useDispatch } from "react-redux";
import { getShowModal} from '../../slices/modalSlice'

export default function RegisterOrLogin() {
    const dispatch = useDispatch();
    return (
        <button type="button" onClick={() => dispatch(getShowModal({item: 'login'}))} className="w-max h-max border-2 border-main text-main font-bold rounded-lg px-4 py-2 text-sm">
            ورود / ثبت نام
        </button>
    )
}