export function prefixRoutes(name: string, routes) {
    return routes.map(entry => {
        entry.path = "/" + name + "/" + entry.path;
        return entry;
    });
}

export function getDateFromString(dateString: string) {
    let parts1 = dateString.split('T');
    let parts = parts1[0].split('-');
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

export function makeTooltip(contract: Contract) {
    return "<div class='container'>" +
        "<div class='row'><div class='col-md-12 alert alert-dark'><h4>" + contract.Company.Name.trim() + "</h4></div></div>" +
        "<div class='row'><div class='col-md-12 alert alert-light'>" + contract.Package.Name.trim() + "</div></div>" +
        "</div>"
}

export function isLoggedIn(): boolean {
    return localStorage.getItem("loggedIn") !== null;
}

export function requireLoggedIn(nextState, replace) {
    console.log("Log: " + JSON.stringify(isLoggedIn()));
    if (!isLoggedIn()) {
        replace({
            pathname: "/accounts/login"
        });
    }
}