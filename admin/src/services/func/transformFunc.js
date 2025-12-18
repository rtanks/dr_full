export const transformFormat = (number) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(number).replace(/\d/g, (digit) => persianDigits[digit]);
}
export const transformFormatWithSpread = (value) => {
    const transformed = new Intl.NumberFormat("fa-IR").format(value)
    return transformed;
}
export const transformFormatWithSpreadEn = (value) => {
    const transformed = new Intl.NumberFormat("en-US").format(value)
    return transformed;
}

function persianToEnglishDigits(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/[\u06F0-\u06F9]/g, d => String(d.charCodeAt(0) - 0x06F0))
    .replace(/[\u0660-\u0669]/g, d => String(d.charCodeAt(0) - 0x0660));
}
export const convertToEnglishFormat = (str) => {
  if (str == null) return "";
  const converted = persianToEnglishDigits(String(str));
  return converted.replace(/[^0-9]/g, "");
}