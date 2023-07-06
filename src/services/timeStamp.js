export const getDate = () => {
  const currentdate = new Date();
  const date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();

  return date;
};

export const getTime = () => {
  const currentdate = new Date();
  const time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

  return time;
};
