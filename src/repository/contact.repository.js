import fetch from "cross-fetch"
import { increaseDuplication } from "./quiz.repository.js"

export const create = async (name, email, token, apiUrl, id_quiz) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('Criando contato na Activecampaign')
            const opt = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Token': token
                },
                body: JSON.stringify({
                    contact: {
                        email: email,
                        firstName: name
                    }
                })
            }

            fetch(`${apiUrl}/api/3/contacts`, opt).then(async (response )=> {
                const result = await response.json()
                switch(response.status) {
                    case 403:
                        console.log('status: wrong token')
                        return reject({ status: 'wrong token'})
                    case 422:
                        console.log('status: duplicated')
                        await increaseDuplication(id_quiz)
                        return reject({ status: 'duplicated'})
                    case 201:
                        console.log('status: success')
                        return resolve({ status: 'success', contactId: result.contact.id})
                    default:
                        console.log('status: fail')
                        console.log(response)
                        return reject({ status: 'fail'})
                }   
            })
        } catch (error) {
            console.log('status: fail')
            return reject({ status: 'fail'})
        }
})}

export const subscribeToList = async (listId, contactId, token, apiUrl) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('Inserindo contato a uma lista na Activecampaign')
            const opt = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Token': token
                },
                body: JSON.stringify({
                    contactList: {
                        list: listId,
                        contact: contactId,
                        status: 1
                    }
                })
            }

            fetch(`${apiUrl}/api/3/contactLists`, opt).then(response => {
                console.log(response.status)
                return resolve({ status: response.status})
            })
        } catch (error) {
            console.log('status: fail')
            return reject({ status: 'fail'})
        }
})}