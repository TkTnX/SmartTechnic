export function getDates() {
	const today = new Date()
	const dates: { label: string; value: string }[] = []

	for (let i = 0; i < 7; i++) {
		const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000)
		const calendarDay = date.toLocaleDateString('ru-RU', {
			month: 'long',
			day: 'numeric'
		})
		const weekday = date.toLocaleDateString('ru-RU', {
			weekday: 'long'
		})

		dates.push({
			label: `${weekday}, ${calendarDay}`,
			value: date.toISOString()
		})
	}

	return dates
}
