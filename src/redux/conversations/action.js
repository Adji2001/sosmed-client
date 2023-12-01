import axios from "axios"

export const setConversations = (currentUserId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URI}api/conversations/${currentUserId}`)

            dispatch({type: 'SET_CONVERSATIONS', payload: res.data})
        } catch (err) {
            console.log(err)
        }
    }
}