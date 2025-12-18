export const sp = (number) => {
  const Number = number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return Number;
};

export const convertPersianToEnglish = (str) => {
  if (!str) return "";
  const persian = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  for (let i = 0; i < 10; i++) {
    str = str.replace(persian[i], english[i]);
  }

  return str;
};

export const onChengFormHandel = (set, e, isNumber, isMobile, isCode) => {
  const value = e.target.value;
  const name = e.target.name;
  const convertNumber = convertPersianToEnglish(value);
  if (isNumber) {
    const number = convertNumber.replace(/[^0-9]/g, "");

    if (isMobile) {
      if (number.length <= 11 && /^0{0,1}$|^09[0-9]{0,9}$/.test(number)) {
        set((prev) => ({
          ...prev,
          [name]: number,
        }));
      }
      return;
    }

    if (isCode) {
      if (number.length <= 10) {
        set((prev) => ({
          ...prev,
          [name]: +number,
        }));
      }
      return;
    }

    set((prev) => ({
      ...prev,
      [name]: +number,
    }));
  } else {
    set((prev) => ({
      ...prev,
      [name]: convertNumber,
    }));
  }
};

export const onChengHandel = (set, e, isNumber, isMobile, isCode) => {
  const value = e.target.value;
  const name = e.target.name;
  const convertNumber = convertPersianToEnglish(value);
  if (isNumber) {
    const number = convertNumber.replace(/[^0-9]/g, "");

    if (isMobile) {
      if (number.length <= 11 && /^0{0,1}$|^09[0-9]{0,9}$/.test(number)) {
        set(number);
      }
      return;
    }
    if (isCode) {
      if (number.length <= 10) {
        set(+number);
      }
      return;
    }
    set(+number);
  } else {
    set(convertNumber);
  }
};

export const calculatePersianAgeFromDate = (birthDate) => {
  const [year, month, day] = birthDate.split("/").map(Number);

  const today = new Date();
  const persianYear = today.getFullYear() - 621; 

  let age = persianYear - year;

  return age;
};

