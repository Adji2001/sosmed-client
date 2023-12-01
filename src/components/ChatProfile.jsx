import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsHouseDoor, BsTelephone } from 'react-icons/bs'
import { FaBirthdayCake, FaUserAlt } from 'react-icons/fa'
import { HiOutlineChatBubbleLeftEllipsis, HiOutlineVideoCamera } from 'react-icons/hi2'
import { PiGraduationCapDuotone } from 'react-icons/pi'
import dateFormat from 'dateformat'

const ChatProfile = ({ currentUser, currentChat }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const friendId = currentChat && currentChat.members.find((id) => id !== currentUser._id)
        
        const getUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URI}api/users?userId=${friendId}`)

                setUser(res.data.other)
            } catch (err) {
                console.log(err)
            }
        }

        getUser()
    }, [currentChat, currentUser])

    return (
        <div className="flex-[3] overflow-y-auto p-2 mt-3 text-slate-100">
            <div className="flex flex-col gap-1 items-center">
                <img 
                    className="h-12 w-12 object-cover rounded-full bg-slate-100" 
                    src={import.meta.env.VITE_API_URI + ((user && user.profilePicture) || 'users/default.jpeg')} 
                    alt="profile" 
                />
                <h5 className="text-lg font-semibold">{user && user.username}</h5>
                <span className="text-base text-slate-400">{user && user.email}</span>
                <div className="flex gap-4 mt-2 items-center justify-center text-2xl">
                    <BsTelephone />
                    <HiOutlineVideoCamera />
                    <HiOutlineChatBubbleLeftEllipsis />
                </div>
            </div>

            <div className='bg-slate-600 flex flex-col mt-8'>
                <div className='flex items-center gap-2 p-2'>
                    <BsHouseDoor />
                    <p>{user ? !user.city ? 'Current City' : user.city : 'loading'}</p>
                </div>
                <div className='flex items-center gap-2 p-2'>
                    <FaUserAlt />
                    <p>{user ? !user.gender ? 'Gender' : user.gender : 'loading'}</p>
                </div>
                <div className='flex items-center gap-2 p-2'>
                    <FaBirthdayCake />
                    <p>{user ? !user.birthday ? 'Birthday' : dateFormat(user.birthday, 'fullDate') : 'loading'}</p>
                </div>
                <div className='flex items-center gap-2 p-2'>
                    <PiGraduationCapDuotone />
                    <p>{user ? !user.collage ? 'Collage' : user.collage : 'loading'}</p>
                </div>
            </div>

            <div className='mt-6 flex flex-col gap-3'>
                <div className='font-semibold flex gap-4'>
                    <span className='py-3 border-b-2'>Shared Files</span>
                    <span className='py-3'>Images</span>
                </div>
                <div>No such File</div>
                <button className='p-2 w-2/5 rounded-md bg-blue-500'>View All</button>
            </div>
        </div>
    )
}

export default ChatProfile