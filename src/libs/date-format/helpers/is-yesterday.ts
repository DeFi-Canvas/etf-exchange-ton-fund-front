const isYesterday = (inputDate: Date) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    const yesterday = new Date(today.setDate(today.getDate() - 1));

    return inputDate.getTime() === yesterday.getTime();
}

export default isYesterday;
