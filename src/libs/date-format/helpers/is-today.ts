const isToday = (inputDate: Date) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate.getTime() === today.getTime();
};

export default isToday;
