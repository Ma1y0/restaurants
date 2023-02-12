import * as jwt from "jsonwebtoken"
import express from "express"
import prisma from "../prisma"
import bcrypt from "bcrypt"

const router = express.Router()
const jwt_secret = process.env.JWT_SECRET

const hasher = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

const generateToken = (payload: any) => {
    if (payload !== undefined) {
        return jwt.sign(payload, jwt_secret, { expiresIn: "30d" })
    } else {
        return "Payload can not be undefined"
    }
}

// Register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    const hashedPassword = await hasher(password)

    if (name && email && password) {
        try {
            const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword
                }
            })

            const token = generateToken({ userId: user.id })

            res.json({
                token: token,
                data: user
            })
        } catch (err) {
            res.status(401).json({
                error: "Something went wrong"
            })
        }
    } else {
        res.status(401).json({
            error: "You need to send name, email and password"
        })
    }
})

export {
    router as userRouter
}