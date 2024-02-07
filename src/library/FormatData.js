import moment from "moment";

export function formatDatetime(date, format) {
    return moment(date).format(format);
}