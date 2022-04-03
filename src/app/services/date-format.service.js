class DateFormatService {
    formatDate(date) {
        var d = new Date(date),
            month = d.getMonth(),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = '' + (d.getHours()),
            minute = '' + (d.getMinutes());

        var today = new Date(),
            todayMonth = today.getMonth(),
            todayDay = '' + today.getDate(),
            todayYear = today.getFullYear(),
            todayHour = '' + (today.getHours()),
            todayMinute = '' + (today.getMinutes());

        const diffMinute = todayMinute - minute
        const diffHour = todayHour - hour
        const diffDay = todayDay - day

        if (month === todayMonth
            && day === todayDay
            && year === todayYear
            && hour === todayHour) {

            if (diffMinute === 0) {
                return "now"
            } else {
                return [diffMinute + "min"]
            }
        } else if (month === todayMonth
            && day === todayDay
            && year === todayYear
            && todayHour > hour) {
            return [diffHour + "h"]
        } else if (month === todayMonth
            && year === todayYear
            && diffDay === 1) {
            return ["Yesterday, " + (hour.length < 2 ? '0' + hour : hour) + ":" + (minute.length < 2 ? '0' + minute : minute)]
        }

        if (day.length < 2)
            day = '0' + day;
        if (hour.length < 2)
            hour = '0' + hour;
        if (minute.length < 2)
            minute = '0' + minute;

        // eslint-disable-next-line default-case
        switch (month) {
            case 0:
                month = 'January'
                break;
            case 1:
                month = 'February'
                break;
            case 2:
                month = 'March'
                break;
            case 3:
                month = 'April'
                break;
            case 4:
                month = 'May'
                break;
            case 5:
                month = 'June'
                break;
            case 6:
                month = 'July'
                break;
            case 7:
                month = 'August'
                break;
            case 8:
                month = 'September'
                break;
            case 9:
                month = 'October'
                break;
            case 10:
                month = 'November'
                break;
            case 11:
                month = 'December'
                break;
        }


        return [day + " " + month + " " + year + ", " + hour + ":" + minute]
    }
}
export default new DateFormatService();