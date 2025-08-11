import { useEffect, useState } from 'react'
import { Range } from 'react-range'
import { useSearchParams } from 'react-router-dom'

import { useProducts } from '@/shared/hooks'

import './_priceRange.scss'

export const PriceRange = () => {
	const { minMaxPrice } = useProducts()
	const [values, setValues] = useState([minMaxPrice[0], minMaxPrice[1]])
	const [searchParams, setSearchParams] = useSearchParams()

	const clamp = (value: number) =>
		Math.min(Math.max(value, minMaxPrice[0]), minMaxPrice[1])

	useEffect(() => {
		if (minMaxPrice[0] !== null && minMaxPrice[1] !== null) {
			setValues(minMaxPrice)
		}
	}, [minMaxPrice])

	const onSubmit = () => {
		const params = new URLSearchParams(searchParams)
		params.set('от', String(values[0]))
		params.set('до', String(values[1]))
		setSearchParams(params)
	}

	return (
		<div className='priceRange'>
			<div className='priceRange__top'>
				<label className='priceRange__label'>
					от{' '}
					<input
						className='priceRange__input'
						type='number'
						value={values[0]}
						onChange={e => {
							const val = clamp(+e.target.value)
							setValues([val, values[1]])
						}}
					/>
				</label>
				<label className='priceRange__label'>
					до{' '}
					<input
						className='priceRange__input'
						type='number'
						value={values[1]}
						onChange={e => {
							const val = clamp(+e.target.value)
							setValues([values[0], val])
						}}
					/>
				</label>
			</div>

			<Range
				step={1}
				min={minMaxPrice[0]}
				max={minMaxPrice[1]}
				values={values}
				onChange={values => setValues(values)}
				renderTrack={({ props, children }) => (
					<div
						{...props}
						ref={props.ref}
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						style={{
							...props.style,
							height: '6px',
							background: '#eaeaea',
							position: 'relative',
							margin: '20px'
						}}
					>
						<div
							style={{
								height: '6px',
								width: '100%',
								borderRadius: '3px',
								background: `linear-gradient(
              to right,
              #eaeaea ${((values[0] - minMaxPrice[0]) / (minMaxPrice[1] - minMaxPrice[0])) * 100}%,
              #4678a6 ${((values[0] - minMaxPrice[0]) / (minMaxPrice[1] - minMaxPrice[0])) * 100}%,
              #4678a6 ${((values[1] - minMaxPrice[0]) / (minMaxPrice[1] - minMaxPrice[0])) * 100}%,
              #eaeaea ${((values[1] - minMaxPrice[0]) / (minMaxPrice[1] - minMaxPrice[0])) * 100}%
            )`
							}}
						></div>
						{children}
					</div>
				)}
				renderThumb={({ props }) => (
					<div
						{...props}
						key={props.key}
						style={{
							...props.style,
							height: '20px',
							width: '20px',
							borderRadius: '50%',
							backgroundColor: '#4678a6',
							transition: 'none',
							marginTop: '-5px'
						}}
					/>
				)}
			/>

			<button onClick={onSubmit} className='priceRange__submit'>
				Применить
			</button>
		</div>
	)
}
