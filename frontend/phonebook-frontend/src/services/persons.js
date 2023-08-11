import axios from 'axios'
const baseUrl = '/api/persons'

const returnResponse = (request) => {
    return request.then(response => {
        return response.data
    })
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return returnResponse(request)
}

const erase = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return returnResponse(request)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return returnResponse(request)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return returnResponse(request)
}

export default { getAll, erase, create, update }