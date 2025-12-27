import { FetchAddressNeshan } from "../../services/Neshan.api";
import MAP from "../profile/module/Map2/MapMain";
import { onChengFormHandel, onChengHandel } from "../../services/functions";
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from "react";

export default function MapAndAddress({style, initialLocation, getLocation, getAddress}) {
    const [location, setLocation] = useState(initialLocation ? initialLocation :{lat:33.5107527,lng:48.3550717});
    const [address, setAddress] = useState("");
    const [data, setData] = useState({});
    const {
      mutate: mutateFetchAddress,
      isPending: isPendingFetchAddress,
      data: dataFetchAddress,
    } = useMutation({
      mutationKey: ["FetchAddress"],
      mutationFn: FetchAddressNeshan,
      onSuccess: (data) => {
        if (data?.status == "OK") {
          console.log(data);

          setData((prev) => ({
            ...prev,
            address: data?.formatted_address,
            location,
          }));
          setAddress(data?.formatted_address);
          getAddress(data?.formatted_address);
          log.success("محدوده  وارد شد ");
        }
      },
      onError: (error) => {
        log.error(error.message || "خطایی رخ داده است");
      },
    });
    useEffect(() => {
      if (location?.lat && location?.lng) {
        getLocation(location)
        mutateFetchAddress({ lat: location.lat, lng: location.lng });
      } else {
        setData((prev) => ({
          ...prev,
          address: "",
          location: null,
        }));
      }
      console.log(location)
    }, [location]);
    return (
        <>
            <label htmlFor="address"
              className={`absolute start-1 -top-6 !h-fit rounded-2xl px-2 text-sm text transition-all ease-linear`}
            >
            </label>
            <input className={`${
                false
                  ? "cursor-not-allowed bg-gray-200 text-gray-600 col-span-full"
                  : "text-gray-500"
              } peer h-14 w-full text-sm sm:text-md rounded-[14px] border border-gray-300 bg-gray-100 px-5 placeholder-gray-400 outline-gray-300 focus:placeholder-transparent rounded-b-none dark:bg-gray-100 placeholder`}
              id="address" name="address"
              // disabled={disabled}
              value={address || "موقعیت مکانی خود را انتخاب کنید"}
              placeholder={location}
              onChange={(e) => {
                onChengFormHandel(setData, e);
                onChengHandel(setAddress, e);
              }}
            />
            <MAP
              data={location}
              setData={setLocation}
              style={style}
              // disabled={isPendingA}ddAd}
            />
        </>
    )
}