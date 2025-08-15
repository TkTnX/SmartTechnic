export const CITIES = [
	{
		label: 'Москва',
		value: 'moscow'
	},
	{
		label: 'Санкт-Петербург',
		value: 'spb'
	},
	{
		label: 'Екатеринбург',
		value: 'ekb'
	},
	{
		label: 'Новосибирск',
		value: 'nsk'
	},
	{
		label: 'Казань',
		value: 'kzn'
	}
]

export const TIMES = [
	{ label: '9:00-11:00', value: '9-11' },
	{ label: '11:00-13:00', value: '11-13' },
	{ label: '13:00-15:00', value: '13-15' },
	{ label: '15:00-17:00', value: '15-17' },
	{ label: '17:00-19:00', value: '17-19' },
	{ label: '19:00-21:00', value: '19-21' }
]

export const ADDRESSES = [
	{
		city: 'Санкт-Петербург',
		addresses: [
			{ label: 'Бульвар Новаторов, 75', value: '1' },
			{ label: 'пер. Матюшенко, 28', value: '2' },
			{
				label: 'пр-кт. Просвещения, 87, литер А, корп. 1 корп',
				value: '3'
			}
		]
	},
	{
		city: 'Москва',
		addresses: [
			{ label: 'Красная площадь', value: '1' },
			{ label: 'Moscow City', value: '2' },
			{
				label: 'Патрики',
				value: '3'
			}
		]
	},
	{
		city: 'Новосибирск',
		addresses: [
			{ label: 'Улица Ленина, 10', value: '1' },
			{ label: 'Проспект Мира, 25', value: '2' },
			{ label: 'Площадь Победы, 5', value: '3' }
		]
	},
	{
		city: 'Екатеринбург',
		addresses: [
			{
				label: 'Улица 8 Марта, 12',
				value: "1"
			},
			{
				label: 'Улица Бориса Ельцина, 34',
				value: "2"
			},
			{
				label: 'Улица Малышева, 54',
				value: "3"
			}
		]
	},
	{
		city: 'Казань',
		addresses: [
			{
				label: 'Улица Баумана, 31',
				value: "1"
			},
			{
				label: 'Улица Татарстан, 12',
				value: "2"
			},
			{
				label: 'Улица Кремлевская, 15',
				value: "3"
			},
		]
	},
]


export const PAYMENT_TYPES = [
	{
		label: 'Наличные',
		value: 'cash'
	},
	{
		label: 'Карта',
		value: 'card'
	}
]