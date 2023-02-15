import { useState, useContext } from "react"
import axios from "../lib/axios"
import { toast } from "react-toastify"
import { UserContext } from "../lib/UserContext"

const LogIn = () => {
	const { user, setUser } = useContext(UserContext)

	const [errorMsg, setErrorMsg] = useState("")
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})

	const onChange = (e: Event) => {
		const target = e.target as HTMLInputElement
		setFormData((prevState) => ({
			...prevState,
			[target.name]: [target.value],
		}))
	}

	const onSubmit = async (e: Event) => {
		e.preventDefault()

		try {
			const response = await axios.post(
				"/user/login",
				JSON.stringify({
					email: formData.email[0],
					password: formData.password[0],
				}),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			)
			toast.info("Good")

			const token = response?.data.token

			setUser({ email: formData.email[0], token })
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<main>
			<form
				className="flex flex-col items-center gap-1 m-6"
				onSubmit={onSubmit}
			>
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
				<button type="submit">Log In</button>
			</form>
		</main>
	)
}

export default LogIn
