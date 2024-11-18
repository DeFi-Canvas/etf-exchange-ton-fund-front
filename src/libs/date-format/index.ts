import {
    isToday,
    isYesterday,
    formatter,
} from './helpers';

const getFormattedDate = (date: Date) =>  {
    const inputDate = new Date(date);

    if (isToday(inputDate)) {
        return 'Today';
    }
    if (isYesterday(inputDate)) {
        return 'Yesterday';
    }
    
    return formatter(date);
}

export default getFormattedDate;
