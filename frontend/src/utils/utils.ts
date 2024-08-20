export function capitalizeFirstLetter(string: string) {
	const words = string.split("-");
	const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
	return capitalizedWords.join(" ");
}


export function getFullName(name: string, surname: string) {
	return `${name} ${surname}`;
}
