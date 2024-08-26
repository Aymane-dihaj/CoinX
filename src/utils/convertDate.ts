export const convertDate = (date: number) => {
    const convertedDate = new Date(date);
    return convertedDate.getDate() + "/" + (convertedDate.getMonth() + 1);
}