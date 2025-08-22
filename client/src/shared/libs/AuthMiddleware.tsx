import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';



import { useUserStore } from '@/shared/stores';




type Props = {
	isNeedAdminCheck?: boolean
}

export const AuthMiddleware = ({ isNeedAdminCheck = false }: Props) => {
	const [isAuth, setIsAuth] = useState<null | boolean>(null)

	const { user, isLoading } = useUserStore()

	useEffect(() => {
		setIsAuth(!!user)
	}, [user])

	console.log(!!user)

	if (!isAuth && !isLoading && !user) {
		return <Navigate to='/' replace />
	}

	if (isNeedAdminCheck && user?.role !== "ADMIN") {
		return <Navigate to='/' replace />
	}

	return <Outlet />
}