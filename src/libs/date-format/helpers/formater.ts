import type { IMonthData } from '../types';

const mapMonthByIndex: Record<number, IMonthData> = {
    0: { short: 'Jan', full: 'January' },
    1: { short: 'Feb', full: 'February' },
    2: { short: 'Mar', full: 'March' },
    3: { short: 'Apr', full: 'April' },
    4: { short: 'May', full: 'May' },
    5: { short: 'Jun', full: 'June' },
    6: { short: 'Jul', full: 'July' },
    7: { short: 'Aug', full: 'August' },
    8: { short: 'Sep', full: 'September' },
    9: { short: 'Oct', full: 'October' },
    10: { short: 'Nov', full: 'November' },
    11: { short: 'Dec', full: 'December' }
};

const formatter = (date: Date): string => {
    const parseDate = date;
    const indexMonth = parseDate.getMonth(); 
    
    const day = parseDate.getDate();
    const month = mapMonthByIndex[indexMonth].short;
    const year = parseDate.getFullYear();

    return `${day} ${month}, ${year}`;
}

export default formatter;
