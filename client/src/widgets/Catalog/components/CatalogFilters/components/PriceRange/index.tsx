import { useState } from 'react'
import { Range } from 'react-range'
import { useSearchParams } from 'react-router-dom'

import './_priceRange.scss'

const MIN = 0
const MAX = 10000

const clamp = (value: number) => Math.min(Math.max(value, MIN), MAX)

export const PriceRange = () => {
	const [values, setValues] = useState([0, 10000])
	const [searchParams, setSearchParams] = useSearchParams()

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

			{/* TODO: Находить Min и Max price */}
			<Range
				step={0.1}
				min={0}
				max={10000}
				values={values}
				onChange={values => setValues(values)}
				renderTrack={({ props, children }) => (
					<div
						{...props}
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
							ref={props.ref}
							style={{
								height: '6px',
								width: '100%',
								borderRadius: '3px',
								background: `linear-gradient(
              to right,
              #eaeaea ${((values[0] - MIN) / (MAX - MIN)) * 100}%,
              #4678a6 ${((values[0] - MIN) / (MAX - MIN)) * 100}%,
              #4678a6 ${((values[1] - MIN) / (MAX - MIN)) * 100}%,
              #eaeaea ${((values[1] - MIN) / (MAX - MIN)) * 100}%
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
