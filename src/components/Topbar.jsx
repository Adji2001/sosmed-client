import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"

const Topbar = ({logoutElement, searchElement, chat}) => {
  const user = useSelector((states) => states.authUser)

  return (
    <div className={`border-b border-slate-500 mb-5 ${chat ? "p-5" : "pb-5"}`}>
        <div className="flex items-center justify-between text-slate-50">
            <div className="flex items-center gap-3">
                <img src={import.meta.env.VITE_API_URI + (user.profilePicture || "users/default.jpeg")} alt="profile" className="w-12 h-12 border rounded-full bg-slate-100 object-cover" />
                <Link to={`${import.meta.env.VITE_CURRENT_URI}profile/${user.username}`}>
                  <span className="text-xl font-semibold">{user.username}</span>
                </Link>
            </div>
            {logoutElement && logoutElement}
        </div>
        {searchElement && searchElement}
    </div>
  )
}

export default Topbar