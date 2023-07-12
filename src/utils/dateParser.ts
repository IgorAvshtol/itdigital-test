export const dateParser = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.getUTCDate();
  const month = newDate.getUTCMonth() < 10 ? `0${newDate.getUTCMonth() + 1}` : newDate.getUTCMonth() + 1;
  const year = newDate.getUTCFullYear();
  const hours = newDate.getUTCHours();
  const minutes = newDate.getUTCMinutes();
  return `${day}/${month}/${year} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};
