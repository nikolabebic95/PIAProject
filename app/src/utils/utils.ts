export function prefixRoutes(name: string, routes) {
    return routes.map(entry => {
        entry.path = "/" + name + "/" + entry.path;
        return entry;
    });
}

export function getDateFromString(dateString: string) {
    let parts = dateString.split('-');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
}

export function getStringFromDate(date: Date) {
    let month = (date.getMonth() + 1);
    let day = date.getDate();
    let monthString = "" + month;
    let dayString = "" + day;
    if (month < 10)
        monthString = "0" + month;
    if (day < 10)
        dayString = "0" + day;
    return date.getFullYear() + '-' + monthString + '-' + dayString
}

export function getTodayInputString(): string {
    return getStringFromDate(new Date());
}

export function getTodayInputDateTimeString(): string {
    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    let hoursString = "" + hours;
    let minutesString = "" + minutes;

    if (hours < 10)
        hoursString = "0" + hours;
    if (minutes < 10)
        minutesString = "0" + minutes;

    return getTodayInputString() + "T" + hoursString + ":" + minutesString;
}

export function getDatePlusYears(date: Date, years: number) {
    return new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
}

export function findFirst(array, func) {
    for (let i = 0; i < array.length; i++) {
        if (func(array[i])) return array[i];
    }

    return null;
}
