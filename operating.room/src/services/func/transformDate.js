export const convertDateToLocalFormat = (value) => {
    const formatter = new Intl.DateTimeFormat("fa-IR", {
      timeZone: "Asia/Tehran",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    const date = new Date(value) 
    const dateConverter = formatter.format(date).split(',');
    const dateValue = value? dateConverter[0] : "";
    const time = value? dateConverter[1] : "";
    return {dateValue, time};
}
