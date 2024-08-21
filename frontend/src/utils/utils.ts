export function capitalizeFirstLetter(string: string) {
	const words = string.split("-");
	const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
	return capitalizedWords.join(" ");
}

export function getFullName(name: string, surname: string) {
	return `${name} ${surname}`;
}

export function getFromLocalStorage(key: string) {
	const value = localStorage.getItem(key);
	if (value) {
		return JSON.parse(value);
	}
	return null;
}

export function setToLocalStorage(key: string, value: any) {
	localStorage.setItem(key, JSON.stringify(value));
}
