import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(url)
    return res.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const res = await axios.post(url, object)
    return res.data
}

const update = async (id, object) => {
    const res = await axios.put(`${url}/${id}`, object)
    return res.data
}

export default {
    getAll,
    createNew,
    update
}