import mongoose from 'mongoose'
import MongoDb from '../utils/mongodb.js'

const QUIZ_COLLECTION = 'quiz'
const IMAGES_COLLECTION = 'quiz_images'
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
                // db.close()
              })
        })
    })
}

export const increaseDuplication = async (_id) => {
    return new Promise((resolve, reject) => {
        console.log('Incrementando duplicações do quiz')
        const objectId = new mongoose.Types.ObjectId(_id)

        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)

            db.collection(QUIZ_COLLECTION).updateOne({ "_id": objectId }, { $inc: {duplicidade: 1}, $currentDate: { lastModified: true } }).then((result) => {
                console.log('Sucesso ao incrementar duplicações do quiz')
                resolve(result)
                // db.close()
            }).catch((error) => {
                console.log('Falha ao incrementar duplicações do quiz')
                reject(error)
                // db.close()
            })
        })
    })
}

export const getContactInfo = async (_id) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('Buscando informações por id do quiz')
            const objectId = new mongoose.Types.ObjectId(_id)
            db.mongo.connect(db.uri, async (error, db) => {
                if (error)
                    return reject(error)
                
                console.log(objectId)
                db.collection(QUIZ_COLLECTION).find({ "_id": objectId }).toArray((error, result) => {  
                    if (error) {
                        console.log('Falha ao buscar informações do quiz')   
                        reject(error)
                    } else {
                        console.log('Sucesso ao buscar informações do quiz')
                        const quiz = result[0]
                        const info = { 
                            token: quiz.token,
                            listId: quiz.listId,
                            apiUrl: quiz.apiUrl
                         }
                        resolve(info)
                    }
                    // db.close()
                  })
            })
        } catch (error) {
            console.log('Falha ao buscar token do quiz')
            reject(error)
        }
    })
}

export const getImages = () => {
    return new Promise((resolve, reject) => {
        console.log('Buscando todas as imagens')
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            db.collection(IMAGES_COLLECTION).find({}).toArray((error, result) => {  
                if (error) {
                    console.log('Falha ao buscar todas as imagens')   
                    reject(error)
                } else {
                    console.log('Sucesso ao buscar todas as imagens')
                    resolve(result)
                }
                // db.close()
              })
        })
    })
}