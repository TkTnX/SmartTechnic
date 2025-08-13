import { FavoritesList } from '@/widgets'

import { Breadcrumbs } from '@/shared/components'

export const FavoritesPage = () => {
	// TODO: В будущем должен быть общий layout profile 
	return (
		<>
			<Breadcrumbs
				items={[
					{ title: 'Профиль', href: '/profile' },
					{ title: 'Избранное' }
				]}
			/>
			<FavoritesList />
		</>
	)
}
