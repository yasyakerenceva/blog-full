export const dateFormatting = (date) => {
	if (isNaN(new Date(date))) {
		return "";
	}

	const year = new Date(date).getFullYear();
	const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
	const day = new Date(date).getDate().toString().padStart(2, "0");

	return `${year}-${month}-${day}`;
};
