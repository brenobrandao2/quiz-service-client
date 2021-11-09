import { Router } from "express"
import { getById, getImages } from "../repository/quiz.repository.js"
import { registerMetric } from '../repository/metric.repository.js'
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

router.post('/registerMetric', async (req, res) => {
    try {
        const { id_quiz, data, acesso, pergunta, resposta, lead } = req.body
        const result = await registerMetric(id_quiz, data, acesso, pergunta, resposta, lead)

        res.send(result)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/getImages', async (req, res) => {
    try {
        const allImages = await getImages()
        res.send(allImages)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default router