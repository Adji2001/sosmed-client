import axios from "axios"
import Swal from 'sweetalert2'

export const setAuthUser = (email, password) => {
    return async (dispatch) => {
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
        
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URI}api/auth/login`, {
                email,
                password
            })

            localStorage.setItem('authUser', JSON.stringify(res.data))

            dispatch({type: 'SET_AUTH_USER', payload: res.data.user})

            await Toast.fire({
                icon: 'success',
                title: "Login successfully!",
            })

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                width: "26rem",
                confirmButtonText: "Siapp bossku",
                text: err.response.data.msg
            });
        }
    }
}

export const unsetAuthUser = () => {
    return (dispatch) => {
        localStorage.removeItem('authUser')
        dispatch({type: 'UNSET_AUTH_USER'})
    }
}