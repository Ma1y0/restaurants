import {
	ChangeEvent,
	ChangeEventHandler,
	FormEvent,
	FormEventHandler,
	useState,
	useContext,
} from "react"
import { toast } from "react-toastify"
import axios from "../lib/axios"
import { UserContext } from "../lib/UserContext"

const Register = () => {
	const { user, setUser } = useContext(UserContext)

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	})

	const onChange: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement

		setFormData((prevState) => ({
			...prevState,
			[target.name]: [target.value],
		}))
	}

	const onSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const response = await axios.post(
				"/user/register",
				JSON.stringify({
					name: formData.name[0],
					email: formData.email[0],
					password: formData.password[0],
				}),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			)

			const token = response?.data.token

			setUser({ email: formData.email[0], name: formData.name[0], token })
		} catch (error) {
			toast.error(`${error}`)
		}
	}

	return (
		<main>
			<form className="flex flex-col items-center gap-1 m-6" onSubmit={onSubmit}>
				<input
					className="sm:w-full md:w-[80%] lg:w-[20%] w-[40%] rounded p-2"
					type="text"
					name="name"
					value={formData.name}
					placeholder="Name"
					onChange={onChange}
					required
				/>
				<input
					className="sm:w-full md:w-[80%] lg:w-[20%] w-[40%] rounded p-2"
					type="email"
					name="email"
					value={formData.email}
					placeholder="Email"
					onChange={onChange}
					required
				/>
				<input
					className="sm:w-full md:w-[80%] lg:w-[20%] w-[40%] rounded p-2"
					type="password"
					name="password"
					value={formData.password}
					placeholder="Password"
					onChange={onChange}
					required
				/>
				<button type="submit">Register</button>
			</form>
		</main>
	)
}

export default Register
