import { VerifyEmail } from '@/widgets'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { authService } from '@/shared/services'

export const VerifyEmailPage = () => {
	const { token } = useParams()
	const [searchParams] = useSearchParams()
	const email = searchParams.get('email')

	const { mutate } = useMutation({
		mutationFn: () => authService.verifyEmail(email!, token!),
		onSuccess: () => location.replace('/'),
		onError: err => toast.error(err.message)
	})

	useEffect(() => {
		mutate()
	}, [])

	return <VerifyEmail />
}
