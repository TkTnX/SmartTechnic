import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import type { IPromo } from '@/shared/types'

import './_bigPromo.scss'

type Props = {
	promo: IPromo
}

export const BigPromo = ({ promo }: Props) => {
	return (
		<section className='bigPromo'>
			<div className='bigPromo__left'>
				<h1 className='bigPromo__title'>{promo.title}</h1>

				<div className='bigPromo__content'>
					<Markdown remarkPlugins={[remarkGfm]}>
						{promo.text}
					</Markdown>
				</div>
            </div>
            <div className="bigPromo__right">
                <img src={promo.image} alt={promo.title} />
            </div>
		</section>
	)
}
