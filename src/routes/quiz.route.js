import { Router } from "express"
import { getById } from "../repository/quiz.repository.js"
import multer from "multer"

const router = Router()
const upload = multer()

router.post('/getById', async (req, res) => {
    try {
        const { key } = req.body || req.query
        const _id = key
        const quiz = await getById(_id)

        res.send(quiz)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default router