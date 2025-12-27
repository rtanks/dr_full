import MapAndAddress from "./MapAndAddress";

export default function ({ close, location }) {
    return (
        <div onClick={close} className="w-full h-screen z-50 flex items-center justify-center fixed top-0 left-0 bg-black/50">
            <div onClick={(e) => e.stopPropagation()} className="w-[90%] sm:w-2/5 rounded-xl bg-white h-max p-2 shadow-lg">
                <div className="w-full h-8 flex items-center px-2 text-a7a7a7 text-lg justify-end">
                    <button onClick={() => close()}>✕</button>
                </div>
                <div></div>
                <MapAndAddress initialLocation={location} getLocation={(val) => console.log(val)} 
                    style={'w-full h-[52vh]'}
                />
            </div>
        </div>
    )
}