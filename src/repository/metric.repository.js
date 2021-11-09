import mongoose from 'mongoose'
import MongoDb from '../utils/mongodb.js'

const QUIZ_METRICAS_COLLECTION = 'quiz_metricas'
const db = new MongoDb()

export const registerMetric = async (id_quiz, data, acesso, pergunta, resposta, lead) => {
    return new Promise((resolve, reject) => {
        console.log('Registrando métrica')
        const objectId = new mongoose.Types.ObjectId(id_quiz)
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
                const metrica = {
                    id_quiz: objectId,
                    data,
                    acesso,
                    pergunta,
                    resposta,
                    lead,
                }
                
            db.collection(QUIZ_METRICAS_COLLECTION).insertOne(metrica).then((result) => {
                console.log('Sucesso ao registrar métrica')
                resolve(result)
                // db.close()
            }).catch((error) => {
                console.log('Falha ao registrar métrica')
                reject(error)
                // db.close()
            })
        })
    })
}