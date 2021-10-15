import mongoose from 'mongoose'
import MongoDb from '../utils/mongodb.js'

const QUIZ_COLLECTION = 'quiz'
const db = new MongoDb()

export const getById = (_id) => {
    return new Promise((resolve, reject) => {
        console.log('Buscando quiz por id')
        const objectId = new mongoose.Types.ObjectId(_id)
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            console.log(objectId)
            db.collection(QUIZ_COLLECTION).find({ "_id": objectId }).toArray((error, result) => {  
                if (error) {
                    console.log('Falha ao buscar o quiz')
                    reject(error)
                } else {
                    console.log('Sucesso ao buscar o quiz')
                    resolve(result)
                }
                db.close()
              })
        })
    })
}

export const getToken = async (_id) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('Buscando token por id do quiz')
            const objectId = new mongoose.Types.ObjectId(_id)
            db.mongo.connect(db.uri, async (error, db) => {
                if (error)
                    return reject(error)
                
                console.log(objectId)
                db.collection(QUIZ_COLLECTION).find({ "_id": objectId }).toArray((error, result) => {  
                    if (error) {
                        console.log('Falha ao buscar token do quiz')   
                        reject(error)
                    } else {
                        console.log('Sucesso ao buscar token do quiz')
                        const token = result[0].token
                        resolve(token)
                    }
                    db.close()
                  })
            })
        } catch (error) {
            console.log('Falha ao buscar token do quiz')
            reject(error)
        }
    })
}