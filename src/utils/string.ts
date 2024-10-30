export const formatCapsToSepareteCamel = (str: string) => {
    return str
        .toLowerCase()
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const formatDateToStr = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day} ${month} ${hours}:${minutes}`;
};

export const formatDateToExtraStr = (date: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const formated = formatDateToStr(date);
    if (formated === formatDateToStr(today)) {
        return 'Today';
    }

    if (formated === formatDateToStr(yesterday)) {
        return 'Yesterday';
    }

    return formated;
};
