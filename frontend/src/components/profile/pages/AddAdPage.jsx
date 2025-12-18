import { useEffect, useState } from "react";
import Button from "../module/button";
import Input from "../module/input";
import MAP from "../module/Map/MapMain";
import SetProvinces from "../module/SetProvinces";
import SetCities from "../module/SetCity";
import { onChengFormHandel, onChengHandel } from "../../../services/functions";
import Calender from "../../general/date.picker/Calender";
import { FetchAddressNeshan } from "../../../services/Neshan.api";
import { useMutation } from "@tanstack/react-query";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useSelector } from 'react-redux';
import loginService from "../../../services/api/loginService";
import HeaderTabMenu from "../../request/HeaderTabMenu";
import { provinces } from "../../../constant/city&province";

const reset = {
  // title: "",
  image: "",
  // gallery: [],
  // description: "",
  location: null,
  address: "",
  mobile: "",
  // price: "",
  // rent: "",
  realState: "",
  constructionDate: "",//birthday
  // amenities: [],
  // rules: [],
  city: "",
  province: "",
  // typeOf: false,
  // view: 0,
};
const AddAdPage = () => {
  // const [isEdited, setIsEdited] = useState(false);
  const userInfo = useSelector(state => state.request);
  const [modal, setModal] = useState(false);
  const [province, setProvince] = useState({});
  // const [location, setLocation] = useState(null);
  const [location, setLocation] = useState({lat:33.5107527,lng:48.3550717});
  const [address, setAddress] = useState("");
  console.log(userInfo)
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
        log.success("محدوده  وارد شد ");
      }
    },
    onError: (error) => {
      log.error(error.message || "خطایی رخ داده است");
    },
  });

  useEffect(() => {
    if (location?.lat && location?.lng) {
      mutateFetchAddress({ lat: location.lat, lng: location.lng });
    } else {
      setData((prev) => ({
        ...prev,
        address: "",
        location: null,
      }));
    }
    console.log(province)
  }, [location]);
  useEffect(() => {
    console.log(userInfo)
    setData({
      image: "",
      name: userInfo.fullName,
      location: userInfo.location || null,
      address: userInfo.address,
      mobile: userInfo.phoneNumber,
      realState: '',
      constructionDate: userInfo.birthday,
      city: userInfo.city ? userInfo.city : 'خرم آباد',
      province: userInfo.province
    })
    setLocation(userInfo.location);
    setAddress(userInfo.address)
    setProvince(() => {
      if(userInfo.province) {
        return provinces.find(p => p.name == userInfo.province)
      } else {
        return (
          { id: 25, name: "لرستان",
            slug: "لرستان", tel_prefix: "066",
          }
        )
      }
    })
  }, [userInfo])

  
  const getDate = (val) => {
      console.log(val)
      setData(prev => ({...prev, constructionDate: val}))
  }
  const getData = (key, value) => {
    setData(prev => ({...prev, [key]: value}))
  }
  const {editMutation} = loginService();
  const editInformationFunc = () => {
    console.log(data)
    editMutation.mutate({
      address: data.address,
      province: data.province,
      city: data.city,
      birthday: data.constructionDate,
      location: data.location,
    })
  }
  return (
    <>
      <div className="flex items-center justify-between rounded-xl bg-white">
        <div className="flex items-center gap-2 sm:gap-4 relative bg-white">
          <label htmlFor="image"
            className="cursor-pointer  w-14 sm:w-16 h-14 sm:h-16 p-0.5 bg-gradient-to-tr  from-purple-800 via-red-500 to-yellow-500  rounded-full  "
          >
            <HiOutlineUserCircle className=" object-cover border-2 text-gray-400 border-white w-full h-full p-1.5 rounded-full bg-gray-200 " />
          </label>
          <div>
            <h2 className="sm:mb-1 text-black font-bold text-lg">{data.name}</h2>
            <p className="text-gray-500">{userInfo.nationalCode}</p>
          </div>
        </div>
        <div className="w-fit">
          <input className="peer  hidden  rounded-[10px] outline-gray-300 h-full w-full border z-50 bg-blue-500 "
            placeholder=" " type="file" id="image"
            name="image" accept="image/*"/>
          <label htmlFor="image" className=" text-main pt-1  cursor-pointer text-sm">
            ویرایش تصویر
          </label>
        </div>
      </div>

      <div className="bg-white grid gap-2 mb-5 !grid-cols-2">
        <div className="col-span-full flex flex-col sm:flex-row items-center gap-2">
          <Input title="شماره تماس"
            FN={(e) => onChengFormHandel(setData, e, true, true)} data={data?.mobile}
            name="mobile" readOnly={true} style="lg:col-span-2"
            // disabled={isPendingFetchAddress}
            />
          <Calender placeholder={'تاریخ تولد'} initialDate={String(data.constructionDate)} 
            getDate={getDate} style="w-full sm:w-1/2"
            // disabled={isPendingAddAd}
          />
        </div>

        <div className="w-full flex flex-row items-center gap-2 col-span-2 border h-13">
          <SetProvinces setData={getData} setProvince={setProvince}
            province={province.name} style={'w-1/2'}
            // disabled={isPendingAddAd}
          />
          <SetCities setData={getData} province={province}
            data={data?.city} style={'w-1/2'}
            // disabled={isPendingAddAd}
          />
        </div>

        <div className="h-[50.5vh] sm:h-[42.5vh] w-full col-span-2 relative">
          <label htmlFor="address"
            className={`absolute start-1 -top-6 !h-fit rounded-2xl px-2 text-sm text transition-all ease-linear`}
          >
          </label>
          <input className={`${
              false
                ? "cursor-not-allowed bg-gray-200 text-gray-600 col-span-full"
                : "text-gray-500"
            } peer h-12 w-full rounded-[14px] border border-gray-300 bg-gray-100 px-5 placeholder-gray-400 outline-gray-300 focus:placeholder-transparent rounded-b-none dark:bg-gray-100 placeholder`}
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
            style=""
            // disabled={isPendingA}ddAd}
          />
        </div>
        <Button type="submit" FA={editInformationFunc}
          disabled={editMutation.isPending} title="ویرایش اطلاعات"
          isLoading={editMutation.isPending}
          style=" !col-span-full "
        />
      </div>
    </>
  );
};

export default AddAdPage;
