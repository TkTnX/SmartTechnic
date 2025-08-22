import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import {
	CartLayout,
	DashboardLayout,
	ProfileLayout,
	RootLayout
} from '@/shared/components/layouts'
import { AuthMiddleware } from '@/shared/libs'
import {
	AboutUsPage,
	CartPage,
	CatalogPage,
	ComparePage,
	ContactsPage,
	DashboardPage,
	DashboardProductsPage,
	DropshippingPage,
	FavoritesPage,
	HistoryPage,
	Homepage,
	InstallmentPage,
	NewPasswordPage,
	NewsItemPage,
	NewsPage,
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
				path: '/promos/:promoId',
				element: <PromoItemPage />
			},
			{
				path: '/vacancies',
				element: <VacanciesPage />
			},
			{
				path: '/news',
				element: <NewsPage />
			},
			{
				path: '/news/:newsId',
				element: <NewsItemPage />
			},
			{
				path: '/compare',
				element: <ComparePage />
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
	},
	{
		path: '/dashboard',
		element: <AuthMiddleware isNeedAdminCheck />,
		children: [
			{
				element: <DashboardLayout />,
				children: [
					{ index: true, element: <DashboardPage /> },
					{
						path: '/dashboard/products',
						element: <DashboardProductsPage />
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
