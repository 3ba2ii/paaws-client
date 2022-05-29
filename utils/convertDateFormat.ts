export const convertDateFormat = (
  date: string,
  format: 'mm/dd/yyyy' | 'yyyy/mm/dd'
): string => {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();

  return format
    .replace('dd', day.toString().padStart(2, '0'))
    .replace('mm', month.toString().padStart(2, '0'))
    .replace('yyyy', year.toString().padStart(4, '0'))

    .replaceAll('/', '-');
};
