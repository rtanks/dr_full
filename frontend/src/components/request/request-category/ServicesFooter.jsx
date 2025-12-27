import { serviceList } from "../../../services/func/getTypeRequest";

export default function ServicesFooter() {
    return (
        <div className="w-full h-max flex flex-col gap-2 border-t border-gray-200">
            <p className="w-full h-max py-2">خدمات در دسترس تا زمان مراجعه</p>
            <div className="w-full h-max flex flex-row flex-wrap gap-1">
                {
                    serviceList.map(service => (
                        <div key={service.service} className="w-max h-max py-1 px-3 border border-a7a7a7 text-898989 rounded-md bg-white">
                            {service.service}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}