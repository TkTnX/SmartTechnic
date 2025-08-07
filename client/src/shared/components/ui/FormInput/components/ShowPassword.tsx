import { Eye, EyeClosed } from "lucide-react"

type Props = {
    showPass: boolean
    setShowPass: (value: boolean) => void
}

export const ShowPassword = ({ showPass, setShowPass }: Props) => {
  return (
    <button
						onClick={() => setShowPass(!showPass)}
						type='button'
						className='formInput__showPass'
					>
						{showPass ? <EyeClosed size={24} /> : <Eye size={24} />}
					</button>
  )
}
