export function prefixRoutes(name: string, routes) {
    return routes.map(entry => {
        entry.path = "/" + name + "/" + entry.path;
        return entry;
    });
}

export function getTodayInputString(): string {
    let now = new Date();
    let month = (now.getMonth() + 1);
    let day = now.getDate();
    let monthString = "" + month;
    let dayString = "" + day;
    if (month < 10)
        monthString = "0" + month;
    if (day < 10)
        dayString = "0" + day;
    return now.getFullYear() + '-' + monthString + '-' + dayString
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