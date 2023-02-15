import { useState } from "react"
import axios from "../lib/axios"

const LogIn = () => {
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

	return (
		<main>
			<form className="flex flex-col items-center gap-1 m-6">
				<input
					className="sm:w-full md:w-[80%] lg:w-[20%] w-[40%] rounded p-2"
					type="email"
					name="email"
					value={formData.email}
					placeholder="Email"
					onChange={onChange}
				/>
				<input
					className="sm:w-full md:w-[80%] lg:w-[20%] w-[40%] rounded p-2"
					type="password"
					name="password"
					value={formData.password}
					placeholder="Password"
					onChange={onChange}
				/>
				<button type="submit" onClick={(e: Event) => e.preventDefault()}>
					Log In
				</button>
			</form>
		</main>
	)
}

export default LogIn
