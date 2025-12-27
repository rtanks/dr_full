import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng, LatLngExpression, Map as LeafletMap } from "leaflet";
import LocationMarker from "./LocationMarker";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { userIcon } from "./MapIcons";
import Bg_Modal from "../BgModal";
import { FaHome } from "react-icons/fa";
import HomeMarker from "./HomeMarker";
import location from '../../../../assets/icons/location.png'
import { useLocation } from "react-router-dom";
// import 'leaflet-gesture-handling';
// import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';

const MAP = ({
  data = null,
  setData = () => {},
  disabled = false,
  show = false,
  items = [],
  style = "",
}) => {
  const mapRef = useRef(null);
  // const center = data ? [+data?.lat, +data?.lng] : [33.5107527,48.3550717];
  const center = [33.5107527,48.3550717];
  // console.log(+data?.lat, +data?.lng);
  
  useEffect(() => {
    if (!mapRef.current) return;
    if (data?.lat && data?.lng) {
      const lat = Number(data.lat);
      const lng = Number(data.lng);
      mapRef.current.setView([lat, lng], mapRef.current.getZoom());
    }
  }, [data]);

  const [position, setPosition] = useState(null);

  const locateUser = () => {
    if (!mapRef.current) return;

    mapRef.current
      .locate({
        setView: false,
        enableHighAccuracy: true,
        maxZoom: 16,
      })
      .on("locationfound", (e) => {
        //this part for location with device
        setPosition(e.latlng);
        setData({lat: e.latlng.lat, lng: e.latlng.lng})
        mapRef.current.flyTo(e.latlng, mapRef.current.getZoom());
      })
      .on("locationerror", (err) => {
        if (err.code === 1) {
          console.warn("⚠️ User denied location permission");
        } else {
          console.warn("⏳ Location temporarily unavailable");
        }
      });
      
  };

  const locatePlace = () => {
    if (!mapRef.current || !data?.lat || !data?.lng) return;
    mapRef.current.flyTo([+data.lat, +data.lng], mapRef.current.getZoom());
  };


  return (
    <div
      className={`${style} relative z-0  overflow-hidden rounded-b-xl map-touch`}
      id="map-outer-wrapper"
    >
      <Bg_Modal
        modal={disabled}
        setModal={() => {}}
        z="!absolute !z-[100000] top-0 !bg-gray-300 !cursor-not-allowed"
      />

        <MapContainer
          center={center}
          zoom={14}
          ref={mapRef}
          style={{ height: "100%", width: "100%" }}
          
        >
          <TileLayer
            // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            // url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            // url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            // url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
            // url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
            // url="https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=YOUR_API_KEY"
            // url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x"
            // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x"
            // url=" https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
            // url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
            // url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {items.map((ad) => (
            <HomeMarker data={ad} key={ad._id} />
          ))}

          {items.length === 0 && (
            <LocationMarker
              data={data}
              setData={setData}
              mapRef={mapRef}
              show={show}
            />
          )}

          {position && <Marker icon={userIcon} position={position} />}
        </MapContainer>

        <div className="pointer-events-none absolute top-[45%] left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
          <img
            src={location}
            alt="marker"
            className={`z-20 h-8 w-8 object-contain ease-in-out`}
          />
          <div
            className={`absolute inset-x-0 top-[80%] z-10 mx-auto h-0 w-0 rounded-full bg-gray-800 opacity-50 ease-in-out `}
          ></div>
        </div>
      {/* {data?.lat && data?.lng && (
        <span
          className="leaflet-map-pane absolute right-4 bottom-14 !z-[2000] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow"
          onClick={locatePlace}
        >
          <FaHome className="text-xl text" />
        </span>
      )} */}
      <span
        className="leaflet-map-pane absolute right-4 bottom-5 !z-[2000] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow"
        onClick={locateUser}
      >
        <FaLocationCrosshairs className="text-xl text" />
      </span>
      
    </div>
  );
};

export default MAP;
