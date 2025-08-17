import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import {
	CartLayout,
	ProfileLayout,
	RootLayout
} from '@/shared/components/layouts'
import {
	CartPage,
	CatalogPage,
	FavoritesPage,
	Homepage,
	ProductPage,
	ProfilePage
} from '@/shared/pages'
import '@/shared/styles/index.scss'

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{
				path: '/',
				index: true,
				element: <Homepage />
			},
			{
				path: '/catalog',
				element: <CatalogPage />
			},
			{
				path: '/product/:productId',
				element: <ProductPage />
			}
		]
	},
	{
		path: '/cart',
		element: <CartLayout />,
		children: [
			{
				index: true,
				element: <CartPage />
			}
		]
	},
	{
		path: '/profile',
		element: <ProfileLayout />,
		children: [
			{
				index: true,
				element: <ProfilePage />
			},
			{
				path: '/profile/favorites',
				element: <FavoritesPage />
			}
		]
	}
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ToastContainer position='bottom-right' />
		</QueryClientProvider>
	</StrictMode>
)
