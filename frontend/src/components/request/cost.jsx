const Cost = ({ Firstcost, Secondcost })=>{
    return(
        <div className="w-[90%] mx-auto text-[15px] text-[#757575] vazir-medium">
            <div>{Firstcost}</div>
            <div className="mt-3">{Secondcost}</div>
        </div>
    )
}
export default Cost;