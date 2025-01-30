function convertToDate(isoDate, showTime = false) {
  const date = new Date(isoDate);

  const day = date.getDate();
  const month = date.toLocaleString("pt-BR", { month: "short" }); // pt-BR ou en-US
  const year = date.getFullYear();

  if (showTime) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day} ${month} ${year} ${hours}:${minutes}`;
  }

  return `${day} ${month} ${year}`;
}

export {
  convertToDate
};