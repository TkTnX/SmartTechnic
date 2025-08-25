import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";



import type { ErrorType } from "@/shared/types";



import "./_delityEntity.scss";

interface DeletableService {
  delete: (id: string) => Promise<unknown>;
}


type Props = {
    id: string
    service: DeletableService
}


export const DeleteEntity = ({service, id}: Props) => {
	const { mutate, isPending } = useMutation({
		mutationFn: () => service.delete(id),
		onSuccess: () => {
			toast.success('Успешное удаление')
			window.location.reload()
		},
		onError: (err: ErrorType) => toast.error(err?.response?.data?.message)
	})

	return (
		<button
			onClick={() => mutate()}
			disabled={isPending}
			className='deleteEntity'
		>
			<Trash />
		</button>
	)
}