import { BiCommentDetail, BiHome, BiSearchAlt, BiUser } from 'react-icons/bi'
import SidebarButton from './atoms/SidebarButton'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const user = useSelector((states) => states.authUser)

  return (
    <div className="flex flex-col max-w-fit justify-center items-center text-xl bg-transparent mr-4">
        <div className='bg-slate-700 flex flex-col p-2 gap-3 rounded-full bg-opacity-5 border border-slate-500'>
          <Link to="/">
            <SidebarButton icon={<BiHome />} title="Home" />
          </Link>
          <Link to='/'>
            <SidebarButton icon={<BiSearchAlt />} title="Search" />
          </Link>
          <Modal />
          <Link to="/messanger">
            <SidebarButton icon={<BiCommentDetail />} title="Chat" />
          </Link>
          <Link to={`${import.meta.env.VITE_CURRENT_URI}profile/${user.username}`}>
            <SidebarButton icon={<BiUser />} title="Profile" />
          </Link>
        </div>
    </div>
  )
}

export default Sidebar