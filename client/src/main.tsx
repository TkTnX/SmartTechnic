import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/shared/components/layouts'
import { Homepage } from '@/shared/pages'
import '@/shared/styles/index.scss'
 
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

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
