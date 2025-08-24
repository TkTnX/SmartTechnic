import { Trash } from "lucide-react";



import "./_deleteSpecification.scss";
import { useMutation } from "@tanstack/react-query";
import { specificationsService } from "@/shared/services";
import { toast } from "react-toastify";
import type { ErrorType } from "@/shared/types";





type Props = {
    specificationId: string
}

export const DeleteSpecification = ({ specificationId }: Props) => {
	const { mutate, isPending } = useMutation({
		mutationFn: () => specificationsService.deleteSpecification(specificationId),
		onSuccess: () => {
			toast.success('Категория успешно удалена')
			window.location.reload()
		},
		onError: (err: ErrorType) => toast.error(err?.response?.data?.message)
	})

	return (
		<button onClick={() => mutate()} disabled={isPending} className='deleteSpecification'>
			<Trash />
		</button>
	)
}