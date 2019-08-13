import axios from 'axios'
const baseUrl = '/api/blogs'

const saveComment = async (id, comment, token) => {
    console.log('COMMENT', comment)
    const config = {
        headers: { Authorization: `bearer ${token}` }
    }

    const res = await axios.post(`${baseUrl}/${id}/comments`, { comment: comment }, config)
    return res.data
}

export default { saveComment }