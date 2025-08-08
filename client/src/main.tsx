import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/shared/components/layouts'
import { Homepage } from '@/shared/pages'
import '@/shared/styles/index.scss'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{
				path: '/',
				index: true,
				element: <Homepage />
			}
		]
	}
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ToastContainer position='bottom-right'  />
		</QueryClientProvider>
	</StrictMode>
)
