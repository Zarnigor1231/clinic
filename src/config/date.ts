export const newDate = () => {
  const currentDate = new Date();

  return new Date(currentDate.getTime() + 30 * 5 * 60000);
};
