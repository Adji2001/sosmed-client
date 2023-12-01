import ProfileCardInfo from "../components/ProfileCardInfo"
import ProfileMenu from "../components/ProfileMenu"
import {BsHouseDoor} from 'react-icons/bs'
import {FaBirthdayCake, FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaUserAlt} from 'react-icons/fa'
import {PiGraduationCapDuotone} from 'react-icons/pi'
import ItemLogo from "../components/atoms/ItemLogo"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { setUserPosts } from "../redux/userPosts/action"
import { followUser, setUser, unfollowUser } from "../redux/user/action"
import ModalProfile from "../components/ModalProfile"
import axios from "axios"
// import ModalEditProfile from "../components/ModalEditProfile";

import Cropper from 'cropperjs'
import Swal from 'sweetalert2'
import { throttle } from '@github/mini-throttle'
// import './styles.css'
import 'cropperjs/dist/cropper.css'

const Profile = () => {
    const currentUser = useSelector((states) => states.authUser)
    const userPosts = useSelector((states) => states.userPosts)
    const user = useSelector((states) => states.user)

    const [followed, setFollowed] = useState(false)

    const dispatch = useDispatch()

    const {username} = useParams() 

    const [userName, setUserName] = useState(username)

    const navigate = useNavigate()

    useEffect(() => {
        try {
            dispatch(setUser(username))
            dispatch(setUserPosts(username))

        } catch (err) {
            console.log('err0r ', err)
        }

    }, [dispatch, username])

    useEffect(() => {
        if (user && currentUser) {
            setFollowed(user.followers.includes(currentUser._id))
        }
    }, [currentUser, user])

    const handleClick = async () => {
        try {
            if (followed) {
                dispatch(unfollowUser(user._id))
            } else {
                dispatch(followUser(user._id))
            }
        } catch (error) {
            console.log(error)
        }

        setFollowed(!followed)
    }

    const sendMessageHandler = async () => {
        console.log({user})
        try {
            await axios.post(`${import.meta.env.VITE_API_URI}api/conversations`, {
                senderId: currentUser._id,
                receiveId: user?._id
            })

            navigate('/messanger')
        } catch (err) {
            console.log(err)
        }
    }

    const editHandler = () => {
        // setEditable(!editable)

        Swal.fire({
            title: 'Edit Profile',
            width: "50rem",
            confirmButtonText: "save profile",
            html: `
            <div class="preview_container">
              <img id="preview" src="${import.meta.env.VITE_API_URI + user.profilePicture}">
              <div>
                <img id="cropperjs" src="${import.meta.env.VITE_API_URI + user.profilePicture}">
              </div>
            </div>
            <input type="text" value="${userName}" class="swal2-input" placeholder="Username">
            <input type="text" value="${user.desc}" class="swal2-input" placeholder="Description">
            `,
            willOpen: () => {
              const image = Swal.getPopup().querySelector('#cropperjs');
              const cropper = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
                crop: throttle(function () {
                  const croppedCanvas = cropper.getCroppedCanvas();
                  const preview = Swal.getPopup().querySelector('#preview');
                  preview.src = croppedCanvas.toDataURL();
                }, 25),
              });
            },
            preConfirm: () => {
              const preview = Swal.getPopup().querySelector('#preview');
              return preview ? preview.src : '';
            },
          });
          
    }


    return (
        <div className="flex flex-col justify-end w-[100%] overflow-hidden rounded-2xl bg-opacity-10 bg-slate-700 border border-slate-500" style={{backdropFilter: "blur(10px)"}}>
            <div className="bg-slate-100 h-2/3 flex">
                {/* section */}
                <div className="flex-[4] flex flex-col items-center">
                    {!user ? 'wait' : <img src={import.meta.env.VITE_API_URI + (user.profilePicture || 'users/default.jpeg')} alt="user" className="h-20 w-20 rounded-full object-cover absolute top-36 border-4 border-slate-100" />}
                    {/* {
                        editable && <ModalEditProfile user={user} />
                    } */}
                    <h2 className="text-2xl font-bold mt-12">
                        {!user ? 'wait' : user.username}
                    </h2>

                    <div>
                    {
                        username !== (currentUser && currentUser.username) 
                        ? <div className="flex gap-3">
                            <button onClick={handleClick} className="text-base inline-block bg-blue-500 text-white px-2 rounded-sm cursor-pointer">
                                {followed ? "Followed" : "Follow"}
                            </button>
                            <button onClick={sendMessageHandler} className="text-base inline-block bg-yellow-500 text-white px-2 rounded-sm cursor-pointer">
                                Message
                            </button>
                          </div>
                        : <div onClick={editHandler} className={`text-base inline-block px-4 py-1 rounded-xl cursor-pointer hover:bg-blue-300`}>Edit</div>
                    }
                    </div>

                    <span className={`text-sm text-slate-500`}>{!user ? 'wait' : user.desc}</span>
                    <div className="flex flex-col">

                        <div className="flex justify-center gap-8 border-b border-slate-500 mx-5 py-2">
                            <ProfileMenu num={!user ? 'wait' : user.followers.length} text="Followers" />
                            <ProfileMenu num={!user ? 'wait' : user.following.length} text="Following" />
                            <ProfileMenu num={!user ? 'wait' : userPosts.length} text="Posts" />
                        </div>

                        <div className="w-[80%] flex flex-wrap justify-around items-center mx-auto gap-5 mt-3 mb-4">
                            <ProfileCardInfo icon={<BsHouseDoor />} title={user ? !user.city ? 'undefined' : user.city : 'loading'} desc="Current City" />
                            <ProfileCardInfo icon={<FaUserAlt />} title={user ? user.gender ? user.gender : 'undefined' : 'loading'} desc="Gender" />
                            <ProfileCardInfo icon={<FaBirthdayCake />} birthday={user && user.birthday} desc="Birthday" />
                            <ProfileCardInfo icon={<PiGraduationCapDuotone />} title={user ? user.collage ? user.collage : 'undefined' : 'loading'} desc="Collage" />
                        </div>

                        <div className="flex justify-center gap-3">
                            <ItemLogo img={<FaInstagram />} />
                            <ItemLogo img={<FaTiktok />} />
                            <ItemLogo img={<FaFacebook />} />
                            <ItemLogo img={<FaLinkedin />} />
                        </div>

                    </div>
                </div>
                
                {/* section */}
                <div className="flex-[8] p-5 pr-9 overflow-y-auto">
                    <div className="flex justify-between">
                        <ul className="flex gap-5 text-lg font-semibold">
                            <li className="cursor-pointer">Posts</li>
                            <li className="text-slate-400 cursor-pointer">Groups</li>
                            <li className="text-slate-400 cursor-pointer">About</li>
                        </ul>
                        {
                            username !== (currentUser && currentUser.username) 
                            ? ""
                            : <ModalProfile />
                        }
                    </div>

                    <div className="mt-4 flex gap-5 flex-wrap">
                        {userPosts.length <= 0 ? 'no posts' : userPosts.map((post) => (
                            post.img 
                            ? <img key={post._id} src={import.meta.env.VITE_API_URI + post.img} alt="cyber" className="w-60 h-60 object-cover object-center cursor-pointer hover:bg-red-500" /> 
                            : <div key={post._id} className="w-60 h-60 bg-blue-100 text-slate-900 flex items-center justify-center cursor-pointer hover:bg-red-500">{post.desc}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Profile