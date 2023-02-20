import { useState } from "react"
import default_user_pic from "../assets/default_user_pic.jpg"

const Review = ({ rating, text, user }: any) => {
    const [stars, setStars] = useState([])

	const star = ["☆", "☆", "☆", "☆", "☆"]
	for (let i = 0; i < rating; i++) {
		star[i] = "★"
	}

        return (
            <div className="flex rounded">
                <img className="w-32" src={user.profilePicture || default_user_pic} alt="User Picture" />
                <div className="ml-3">
                    <h3>{user.name}</h3>
                    <p>{text}</p>
                </div>
            </div>
        )
    }

export default Review
