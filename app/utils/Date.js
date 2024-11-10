// Hàm để định dạng ngày
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Hàm kiểm tra và định dạng các trường ngày trong dữ liệu
export const formatDatesInData = (data) => {
  return data.map((item) => {
    const formattedItem = { ...item };
    for (const key in item) {
      if (typeof item[key] === "string" && !isNaN(Date.parse(item[key]))) {
        formattedItem[key] = formatDate(item[key]);
      }
    }
    return formattedItem;
  });
};

// Hàm chuyển đổi định dạng ngày
export const formatDateForMySQL = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
