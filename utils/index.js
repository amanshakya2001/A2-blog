const formatTime = (date) => {
    let format = new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    return format;
};

module.exports = {
    formatTime
};