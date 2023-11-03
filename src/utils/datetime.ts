export const toDateString = (datetime) => {
  const now = Date.now();
  const dt = new Date(datetime);
  const dtTimeStamp = dt.getTime();
  const day = dt.getDay();
  const month = dt.getMonth() - 1;
  const year = dt.getFullYear();
  const hours = dt.getHours();
  const min = dt.getMinutes();

  const dayPrefix = day < 10 ? "0" : "";
  const monthprefix = month < 10 ? "0" : "";

  const date = `${dayPrefix}${day}-${monthprefix}${month}-${year}`;
  const time = `${hours}:${min}`;

  return `${date} | ${time}`;
};
