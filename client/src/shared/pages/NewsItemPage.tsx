import { useParams } from "react-router-dom";



import { Breadcrumbs, Skeleton } from "@/shared/components";
import { newsService } from "@/shared/services";
import { BigNews } from "@/widgets";
import { useQuery } from "@tanstack/react-query";





export const NewsItemPage = () => {
    const { newsId } = useParams()
    
    	const {
			data,
			isPending,
			error
		} = useQuery({
			queryKey: ['news item', newsId],
			queryFn: () => newsService.getNewsItem(newsId!)
		})

    if(error) return <p className='error'>{error.message}</p>
    
    return (
        <>
            <Breadcrumbs items={[{ title: 'Новости', href: "/news" }, {title: data?.title || 'Загрузка...'}]} />
            {isPending ? <Skeleton height={500}  /> : <BigNews news={data} />}
        </>
  )
}