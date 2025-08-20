import { Breadcrumbs } from "@/shared/components"
import { PromosList } from "@/widgets"

export const PromosPage = () => {
    return (
        <>
            <Breadcrumbs items={[{ title: 'Акции' }]} />
            <PromosList />
        </>
  )
}
