import axios from "axios"

export const setUserPosts = (username) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URI}api/posts/profile/${username}`)

            dispatch({type: 'SET_USER_POSTS', payload: res.data})
        } catch (err) {
            alert(err.message)
        }
    }
}