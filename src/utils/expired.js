const plusMinutes = (old, minutes) => new Date(old.getTime() + minutes * 60000);
const expired = (date, minutes) => (date !== null && plusMinutes(date, 10) < new Date());

export default expired;