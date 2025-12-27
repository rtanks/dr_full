import { useMapEvents, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { ShopIcon } from "./MapIcons";
import location from "../../../../assets/icons/location.png";
import myLocation from "../../../../assets/icons/myLocation.png";

const LocationMarker = ({ data, setData, mapRef, show }) => {
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // if (!data) {
    const handleClick = (e) => {
      const center = map.getCenter();
      setData({ lat: center.lat, lng: center.lng });
      map.off("click", handleClick);
      console.log('click on map', {lat: e.latlng.lat, lng: e.latlng.lng})
      setData({lat: e.latlng.lat, lng: e.latlng.lng});
    };

    const handleMoveStart = () => setMoving(true);
    const handleMoveEnd = () => setMoving(false);
    map.on("movestart", handleMoveStart);
    map.on("moveend", handleMoveEnd);
    map.on("click", handleClick);
    // map.on('scrollwheel', (e ) => e.stoppropagation())
    return () => {
      map.off("click", handleClick);
    };
    // }
  }, [data]);
  
 if (data?.lat && data?.lng) {
  return (
    <Marker
      position={[+data.lat, +data.lng]}
      icon={ShopIcon}
      eventHandlers={{
        click: () => {
          if (!show) setTimeout(() => setData(null), 0);
        },
      }}
    >
      <Popup>موقعیت </Popup>
    </Marker>
  );
}

  return (
    <div className="pointer-events-none absolute top-[45%] left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
      
      <img
        src={myLocation}
        alt="marker"
        className={`z-20 h-8 w-8 object-contain ease-in-out ${
          moving && "mb-1 !h-9 !w-9"
        }`}
      />
      <div
        className={`absolute inset-x-0 top-[80%] z-10 mx-auto h-0 w-0 rounded-full bg-gray-800 opacity-50 ease-in-out ${
          moving ? "!h-2 !w-2" : ""
        }`}
      ></div>
    </div>
  );
};

export default LocationMarker;