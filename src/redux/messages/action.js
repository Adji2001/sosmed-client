import axios from "axios"

export const setMessages = (currentChatId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URI}api/messages/${currentChatId}`)

            dispatch({type: 'SET_MESSAGES', payload: res.data})
        } catch (err) {
            console.log(err)
        }
    }
}

export const someMessage = (conversationId) => {
    return (dispatch) => {
        dispatch({type: 'SOME_MESSAGE', payload: conversationId})
    }
}

export const addMessage = (message) => {
    return async (dispatch) => {
        dispatch({type: 'ADD_MESSAGE', payload: message})

        try {
            message.conversationId && await axios.post(`${import.meta.env.VITE_API_URI}api/messages`, message)

        } catch (err) {
            console.log(err)
            dispatch({type: 'ADD_MESSAGE', payload: message})
        }
    }
}

export const deleteMessage = (messageId) => {
    return async (dispatch) => {
        dispatch({type: 'DELETE_MESSAGE', payload: messageId})
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URI}api/messages/${messageId}`)

            alert(res.data.msg)
        } catch (err) {
            console.log(err)
            dispatch({type: 'DELETE_MESSAGE', payload: messageId})
        }
    }
}