import './_addToCompare.scss'
import CompareIcon from './images/graph.svg?react'

type Props = {
	productId: string
}

export const AddToCompare = ({ productId }: Props) => {
	return (
		<button className='addToCompare'>
			<CompareIcon />
		</button>
	)
}
