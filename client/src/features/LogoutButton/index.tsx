import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { authService } from '@/shared/services'

import './_logoutButton.scss'

export const LogoutButton = () => {
	const { mutate } = useMutation({
		mutationFn: () => authService.logout(),
		onSuccess: () => location.reload(),
		onError: err => toast.error(err.message)
	})

	return (
		<button onClick={() => mutate()} className='logoutButton'>
			Выйти
		</button>
	)
}
