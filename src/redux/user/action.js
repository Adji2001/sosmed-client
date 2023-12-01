import axios from "axios"
import { getAccessToken } from "../../apiCalls"

export const setUser = (username) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URI}api/users?username=${username}`)

            dispatch({type: 'SET_USER', payload: res.data.other})
        } catch (err) {
            alert(err.message)
        }
    }
}

export const followUser = (userId) => {
    return async (dispatch, getState) => {
        const { authUser } = getState()

        dispatch({type: 'FOLLOW_USER', payload: authUser._id})
        try {
            await axios.put(`${import.meta.env.VITE_API_URI}api/users/${userId}/follow`, {userId: authUser._id}, {headers: {
                Authorization: `Bearer ${getAccessToken().token}`
            }})
        } catch (err) {
            alert(err.response.data.msg)
            dispatch({type: 'UNFOLLOW_USER', payload: authUser._id})
        }
    }
}

export const unfollowUser = (userId) => {
    return async (dispatch, getState) => {
        const { authUser } = getState()

        dispatch({type: 'UNFOLLOW_USER', payload: authUser._id})
        try {
            await axios.put(`${import.meta.env.VITE_API_URI}api/users/${userId}/unfollow`, {userId: authUser._id}, {headers: {
                Authorization: `Bearer ${getAccessToken().token}`
            }})
        } catch (err) {
            alert(err.response.data.msg)
            dispatch({type: 'FOLLOW_USER', payload: authUser._id})
        }
    }
}