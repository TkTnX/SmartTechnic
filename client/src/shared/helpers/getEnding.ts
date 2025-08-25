export function getEnding(quantity: number, word: string) {
	console.log(quantity % 10)
	if (quantity % 10 === 1) return `${quantity} ${word}`

	if (quantity % 10 >= 2 && quantity % 10 <= 4) return `${quantity} ${word}а`

	if (quantity % 10 >= 5) return `${quantity} ${word}ов`
}
