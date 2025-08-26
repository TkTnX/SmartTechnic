import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { Button } from '@/shared/components'
import { authService } from '@/shared/services'
import { useUserStore } from '@/shared/stores'

export const VerifyEmailBtn = () => {
	const user = useUserStore(state => state.user)
	const { mutate } = useMutation({
		mutationFn: () => authService.verifyEmail(user?.email as string),
		onSuccess: () => toast.success('Письмо отправлено вам на почту'),
		onError: err => toast.error(err.message)
	})

	return <Button onClick={() => mutate()} text='Подтвердить' />
}
