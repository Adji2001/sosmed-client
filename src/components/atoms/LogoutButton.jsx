import { useDispatch } from "react-redux"
import { unsetAuthUser } from "../../redux/authUser/action"
import Swal from 'sweetalert2'

const LogoutButton = () => {
    const dispatch = useDispatch()

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

    const logoutHandler = () => {
        Swal.fire({
            title: "Are you sure to logout?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!",
            cancelButtonText: "No, Cancel",
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
              dispatch(unsetAuthUser())
              await Toast.fire({
                icon: 'success',
                title: "Your has been logout.",
              })
            }
          });
    }
    return (
        <button onClick={logoutHandler} className="bg-red-500 px-4 py-1 rounded-full">Logout</button>
    )
}

export default LogoutButton