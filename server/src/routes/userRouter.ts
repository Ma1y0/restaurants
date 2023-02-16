import * as jwt from "jsonwebtoken"
import express from "express"
import prisma from "../prisma"
import bcrypt from "bcrypt"

const router = express.Router()
const jwt_secret = process.env.JWT_SECRET

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" })
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        const passwordsMatch = await bcrypt.compare(password, user.password)

        if (!passwordsMatch) {
            res.status(401).json({ error: "Wrong password or email" })
        }

        const token = jwt.sign(
            {
                "Data": {
                    "name": user.name,
                    "email": user.email
                }
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "60s"
            }
        )

        let refreshToken: string = "j"

        if (user.refreshToken) {
            refreshToken = user.refreshToken
        } else {
            refreshToken = jwt.sign(
                {
                    "name": user.name,
                    "email": user.email
                },
                process.env.JWT_SECRET,
                { expiresIn: "12d" }
            )
        }

        const userUpdated = await prisma.user.update({
            where: {
                email
            },
            data: {
                refreshToken
            }
        })

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })

        res.status(200).json({
            message: "User has been sucesfully logged In",
            data: {
                name: userUpdated.name
            },
            token
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400).json({error: "Name, email and password are required"})
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const token = jwt.sign(
            {
                "Data": {
                    "name": name,
                    "email": email
                }
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "60s"
            }
        )

        const refreshToken: string = jwt.sign(
            {
                "name": name,
                "email": email
            },
            process.env.JWT_SECRET,
            { expiresIn: "12d" }
        )

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                refreshToken: refreshToken
            }
        })

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })

        res.status(201).json({
            message: "User has been sucesfully Registered",
            token
        })

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

    
})

export {
    router as userRouter
}