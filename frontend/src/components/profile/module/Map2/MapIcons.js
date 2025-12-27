import { Icon } from "leaflet";
import location from "../../../../assets/icons/location.png";
import myLocation from "../../../../assets/icons/myLocation.png";
import home from "../../../../assets/icons/home.png";

export const userIcon = new Icon({
  iconUrl: myLocation,
  iconSize: [30, 30],
  iconAnchor: [16, 18],
  popupAnchor: [0, -38],
});

export const ShopIcon = new Icon({
  iconUrl: myLocation,
  iconSize: [25, 35],
  iconAnchor: [10, 35],
  popupAnchor: [0, -38],
});
export const homeIcon = new Icon({
  iconUrl: home,
  iconSize: [40, 30],
  iconAnchor: [10, 35],
  popupAnchor: [0, -38],
});
