import axios from 'axios'
import { getAccessToken } from '../../apiCalls'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
})

// SET POST action
export const setPosts = (userId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URI}api/posts/timeline/${userId}`)

            dispatch({type: 'SET_POSTS', payload: res.data.posts})
        } catch (err) {
            alert(err.message)
        }
    }
}

// ADD POST action
export const addPost = (userId, desc, file) => {
    return async (dispatch) => {
        const newPost = {
            userId,
            desc
        }
        
        if (file) {
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append('name', fileName)
            data.append('file', file)
            newPost.img = 'posts/' + fileName

            console.log('file ', file)
            console.log('newPOst ', newPost)
            console.log('data ', data)
        
            try {
                await axios.post(`${import.meta.env.VITE_API_URI}api/upload`, data)
                console.log('data ', data)
            } catch (err) {
                alert(err.message)
            }
        }
    
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URI}api/posts`, newPost, {
              headers: {
                Authorization: `Bearer ${getAccessToken().token}`
              }
            })
            dispatch({type: 'ADD_POST', payload: res.data.post})

            await Toast.fire({
                icon: 'success',
                title: "Post has been added!",
            })
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                width: "26rem",
                confirmButtonText: "Siapp bossku",
                text: err.response.data.error
            });
            // alert(err.response.data.error)
        }
    }
}

// TOGGLE LIKE POST action
export const toggleLikePost = (userId, postId) => {
    return async (dispatch) => {
        dispatch({type: 'TOGGLE_LIKE_POST', payload: {userId, postId}})

        try {
            await axios.put(`${import.meta.env.VITE_API_URI}api/posts/${postId}/like`, {userId}, {
                headers: {
                    Authorization: `Bearer ${getAccessToken().token}`
                }
            })
        } catch (err) {
            alert(err.response.data.error)
            dispatch({type: 'TOGGLE_LIKE_POST', payload: {userId, postId}})
        }
    }
}

// UPDATE POST action
export const updatePost = (postId, userId, desc, img, image) => {
    return async (dispatch) => {
        const newPost = {
            postId,
            userId,
            desc
        }

        // console.log({file: img, image})
        
        if (img) {
            const data = new FormData()
            const fileName = Date.now() + img.name
            data.append('name', fileName)
            data.append('file', img)
            newPost.img = 'posts/' + fileName

            try {
                await axios.post(`${import.meta.env.VITE_API_URI}api/upload`, data)
                console.log('data ', data)
            } catch (err) {
                alert(err.message)
            }
        }

        try {
            console.log('newPost 2d ', newPost)

            const {data : {msg}} = await axios.patch(`${import.meta.env.VITE_API_URI}api/posts/${postId}`, newPost, {
                headers: {
                    Authorization: `Bearer ${getAccessToken().token}`
                }
            })

            dispatch({type: 'EDIT_POST', payload: {...newPost, img: newPost.img ? newPost.img : image}})
            
            await Toast.fire({
                icon: 'success',
                title: msg,
            })
        } catch (err) {
            console.log(err)
        }
    }
}

// DELETE POST action
export const deletePost = (postId, userId) => {
    return async (dispatch) => {

        try {
            const {data: {msg}} = await axios.delete(`${import.meta.env.VITE_API_URI}api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${getAccessToken().token}`
                },
                data: {userId}
            })

            dispatch({type: 'DELETE_POST', payload: postId})

            await Toast.fire({
                icon: 'success',
                title: msg,
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const searchPost = (keyword) => {
    return (dispatch, getState) => {
        const { posts } = getState();
        const filteredPosts = posts.filter(post => post.desc.toLowerCase().includes(keyword.toLowerCase()));
        dispatch({ type: 'SEARCH_POSTS', payload: { keyword, filteredPosts } });
    }
}
