const convertDateToRelative = date => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return date.toLocaleDateString();
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        if (interval > 7) {
            return date.toLocaleDateString();
        }
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
};
export default convertDateToRelative;