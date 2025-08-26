import { Link } from "react-router-dom"
import "./_verifyEmail.scss"
export const VerifyEmail = () => {
  return (
    <section className='verifyEmail'>
      <h1 className="verifyEmail__title">Успешное подтверждение почты!</h1>
      <Link className="verifyEmail__link" to={'/'}>Вы можете вернуться на главную</Link>
    </section>
  )
}
