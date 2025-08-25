export function shrinkText(text: string) {
	return `${text.split('.').splice(0, 2).join('.')}.`
}
