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

export function fixDate(date: string): string {
    let parts = date.split("/");
    return parts[2] + "-" + parts[1] + "-" + parts[0];
}

export function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    let objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );
    // Create an array to hold our data. Give the array
    // a default empty first row.
    let arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    let arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){
        // Get the delimiter that was found.
        let strMatchedDelimiter = arrMatches[ 1 ];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
        ){
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );
        }

        let strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
            );
        } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    // Return the parsed data.
    return( arrData );
}
