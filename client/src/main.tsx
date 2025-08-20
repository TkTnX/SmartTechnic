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
import { AuthMiddleware } from '@/shared/libs'
import {
	AboutUsPage,
	CartPage,
	CatalogPage,
	ContactsPage,
	DropshippingPage,
	FavoritesPage,
	HistoryPage,
	Homepage,
	InstallmentPage,
	NewPasswordPage,
	PersonalPage,
	ProductPage,
	ProfilePage,
	PromoItemPage,
	PromosPage,
	ServicePage,
	VacanciesPage,
	WholesalePage
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
			},
			{
				path: '/about',
				element: <AboutUsPage />
			},
			{
				path: '/service',
				element: <ServicePage />
			},
			{
				path: '/contacts',
				element: <ContactsPage />
			},
			{
				path: '/installment',
				element: <InstallmentPage />
			},
			{
				path: '/wholesale',
				element: <WholesalePage />
			},
			{
				path: '/dropshipping',
				element: <DropshippingPage />
			},
			{
				path: '/promos',
				element: <PromosPage />
			},
			{
				path: "/promos/:promoId",
				element: <PromoItemPage />
			},
			{
				path: "/vacancies",
				element: <VacanciesPage />
			}
		]
	},
	{
		path: '/cart',
		element: <AuthMiddleware />,

		children: [
			{
				element: <CartLayout />,
				children: [{ element: <CartPage />, index: true }]
			}
		]
	},
	{
		path: '/profile',
		element: <AuthMiddleware />,
		children: [
			{
				element: <ProfileLayout />,
				children: [
					{ index: true, element: <ProfilePage /> },
					{
						path: '/profile/personal',
						element: <PersonalPage />
					},
					{
						path: '/profile/history',
						element: <HistoryPage />
					},
					{
						path: '/profile/favorites',
						element: <FavoritesPage />
					},
					{
						path: '/profile/new-password',
						element: <NewPasswordPage />
					}
				]
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
