function formatEnglishDate(date){
    return date.toLocaleString(
        "en-US",
        {
            day:"numeric",
            month:"long"
        }
    );
}
function formatArabicDate(date){
       return date.toLocaleString(
        "ar-SA",
        {
            day:"numeric",
            month:"long"
        }
    );
}
export const dateFormatters = {
    en: formatEnglishDate,
    ar: formatArabicDate
}


function formatArabicTime(date){
       return date.toLocaleTimeString(
        "ar-SA",
        {
            minute:"2-digit",
            hour:"numeric"
        }
    );
}
function formatEnglishTime(date){
       return date.toLocaleTimeString(
        "en-US",
        {
            minute:"2-digit",
            hour:"numeric"
        }
    );
}

export const timeFormatters = {
    en: formatEnglishTime,
    ar: formatArabicTime
}
