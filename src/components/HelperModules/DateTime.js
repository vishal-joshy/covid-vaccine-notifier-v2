const zeroCorrect = (value) => {
	if (value < 10) {
		return `0${value}`;
	}
	return value;
};

const getTime = () => {
	const date = new Date();
	const hourString = zeroCorrect(date.getHours());
	const minuteString = zeroCorrect(date.getMinutes());
	const secondString = zeroCorrect(date.getSeconds());
	const timeString = `${hourString}:${minuteString}:${secondString}`;
	return timeString;
};

const getPresentDate = () => {
	const today = new Date();
	const dd = zeroCorrect(today.getDate());
	let mm = zeroCorrect(today.getMonth() + 1);
	const yyyy = zeroCorrect(today.getFullYear());
	const todayString = `${dd}-${mm}-${yyyy}`;
	return todayString;
};

export { getPresentDate, getTime };
