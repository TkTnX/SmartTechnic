import { Breadcrumbs } from "@/shared/components"
import { News } from "@/widgets"

export const NewsPage = () => {
    return (
        <>
            <Breadcrumbs items={[{ title: 'Новости' }]} />
            <News isNewsPage={true} />
        </>
  )
}
