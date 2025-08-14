import { ADDRESSES } from "@/shared/constants"
import { useState } from "react"

export const PickupAddresses = () => {
    const [currCity, setCurrCity] = useState('spb')
    console.log(setCurrCity)
		const [activeAddres, setActiveAddress] = useState('spb-1')
	return (
		<div className='deliveryInfo__addresses'>
			{ADDRESSES.find(city => city.city === currCity)!.addresses.map(
				address => (
					<button
						onClick={() =>
							setActiveAddress(`${currCity}-${address.value}`)
						}
						className={`deliveryInfo__type ${activeAddres === `${currCity}-${address.value}` ? 'active' : ''}`}
					>
						<div className='deliveryInfo__type-dot' />
						{address.label}
					</button>
				)
			)}
		</div>
	)
}
