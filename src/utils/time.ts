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

export const getCurrentMonthRange = (): { start: string; end: string } => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const startDate = new Date(year, month, 1); // 1st day of the month
  const endDate = new Date(year, month + 1, 0); // Last day of the month

  const formatDate = (date: Date): string =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  return {
    start: formatDate(startDate),
    end: formatDate(endDate),
  };
};

