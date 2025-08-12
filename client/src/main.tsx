import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { RootLayout } from '@/shared/components/layouts'
import { CatalogPage, Homepage, ProductPage } from '@/shared/pages'
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
			},
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
