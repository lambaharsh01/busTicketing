export const currentTimeStamp = (): string => {
  const date = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const [datePart, timePart] = date.split(", ");
  const [month, day, year] = datePart.split("/");

  return `${year}-${month}-${day} ${timePart}`;
};

export const formatDate = (dateString: string): string => {
  let date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const day = ("0" + date.getDate()).slice(-2);
  const month = date.toLocaleString("en-US", { month: "short" }).slice(0, 3);
  const year = date.getFullYear().toString().slice(-2);
  const time = formattedDate.split(",")[1].trim();

  const [hour, minuet, secAndMeridiem] = time.split(":");
  const [, meridiem] = secAndMeridiem.split(" ");
  return `${day} ${month}, ${year} | ${hour}:${minuet} ${meridiem}`;
};
