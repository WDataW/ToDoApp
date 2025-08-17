function formatEnglishDate(date) {
    return date.toLocaleString(
        "en-US",
        {
            calendar: "gregory",
            day: "numeric",
            month: "long"
        }
    );
}
function formatArabicDate(date) {
    return date.toLocaleString(
        "ar-SA",
        {
            calendar: "gregory",
            day: "numeric",
            month: "long"
        }
    );
}
export const dateFormatters = {
    en: formatEnglishDate,
    ar: formatArabicDate
}


function formatArabicTime(date) {
    return date.toLocaleTimeString(
        "ar-SA",
        {
            minute: "2-digit",
            hour: "numeric"
        }
    );
}
function formatEnglishTime(date) {
    return date.toLocaleTimeString(
        "en-US",
        {
            minute: "2-digit",
            hour: "numeric"
        }
    );
}

export const timeFormatters = {
    en: formatEnglishTime,
    ar: formatArabicTime
}


export function ISOToDate(ISO) {
    return new Date(ISO);
}



export const daysOfWeek = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
}

export function isEqual(date1, date2) {
    return date1.getFullYear() == date2.getFullYear() &&
        date1.getMonth() == date2.getMonth() &&
        date1.getDate() == date2.getDate()
}