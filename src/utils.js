import * as React from "react";
import moment from "moment";

export function truncateString(str, num) {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...' + str.slice(str.length - num, str.length)
}

export const TimeText = ({record = {}, source}) => {
    return (
        <span>{moment(record[source]).fromNow()}</span>
    )
}
