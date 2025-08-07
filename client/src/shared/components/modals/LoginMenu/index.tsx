import { useState } from 'react'

import { Modal } from '@/shared/components/ui'

import './_loginMenu.scss'

export const LoginMenu = () => {
	const [open, setOpen] = useState(false)
	return (
		<>
			<button onClick={() => setOpen(true)} className='header__controls-button'>Войти</button>
			<Modal className='loginMenu' open={open} setOpen={setOpen} title='Вход'></Modal>
		</>
	)
}

