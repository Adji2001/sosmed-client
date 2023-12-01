import { useState } from "react"
import { BsImage } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from "../redux/posts/action"
import { FiEdit } from "react-icons/fi"
import axios from "axios"

const ModalEditProfile = ({user, hideHandler}) => {
//   const user = useSelector((states) => states.authUser)
  const [showModal, setShowModal] = useState(false)
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState(null)

  // const dispatch = useDispatch()


  // UPDATE POST action
  const updateProfile = async (userId, img, image) => {
    
        let profilePicture = image
        
        if (img) {
            const data = new FormData()
            const fileName = Date.now() + img.name
            data.append('name', fileName)
            data.append('file', img)
            profilePicture = 'users/' + fileName

            try {
                await axios.post(`${import.meta.env.VITE_API_URI}api/profile/upload`, data)
            } catch (err) {
                alert(err.message)
            }

        }
          
          // console.log({profilePicture})
        // console.log({file: img, image})

        try {
            // console.log('newPost 2d ', newPost)

            const res = await axios.patch(`${import.meta.env.VITE_API_URI}api/users/${userId}`, {profilePicture})

            console.log(res)
            // dispatch({type: 'EDIT_POST', payload: {...newPost, img: newPost.img ? newPost.img : image}})
            
            // alert(msg)
        } catch (err) {
            console.log(err)
        }
  }


  const submitHandler = async (e) => {
    e.preventDefault()
    setShowModal(false)
    setFile(null)

    updateProfile(user._id, file, user.profilePicture)
    // dispatch(updatePost(post._id, user._id, desc, file, post.img))
    // hideHandler()
  }

  return (
    <>
      <button
        className='bg-blue-600 p-2 rounded-full absolute left-52 top-48'
        type="button"
        title="Edit"
        onClick={() => setShowModal(true)}
      >
        <FiEdit className="text-slate-100 text-lg" />
      </button>
      {showModal && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative min-w-[50%] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form onSubmit={submitHandler} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-slate-900 font-semibold">
                    Update profile picture
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false)
                      setFile(null)
                    //   setDesc(post.desc)
                    }}
                  >
                    <span className="bg-transparent text-red-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 flex-auto">
                  <div className="my-2 text-slate-500 text-lg leading-relaxed flex flex-col gap-4">
                    <input onChange={(e) => setDesc(e.target.value)} type="text" contentEditable={true} className="focus:border-b-2 focus:outline-none border-b-2" value={desc} />
                    <label htmlFor="file" className="cursor-pointer">
                        {file ? (
                          <img src={URL.createObjectURL(file)} alt="web" className='bg-slate-100 mt-3 max-h-72 object-cover' />
                        ) : (
                          <>
                            { user?.profilePicture ? (
                              <>
                                <img src={import.meta.env.VITE_API_URI + (user?.profilePicture || 'users/default.jpeg')} alt="web" className='bg-slate-100 mt-3 max-h-72 object-cover' />
                                <BsImage className="text-4xl inline-block mr-2" />
                                <span>Select image</span>
                              </>
                            ) : (
                              <>
                                <BsImage className="text-4xl inline-block mr-2" />
                                <span>Select image</span>
                              </>
                            ) }
                            
                          </>
                        )}
                    </label>
                    <input type="file" id="file" accept=".png,.jpg,.jpeg" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      setFile(null)
                    //   setDesc(post.desc)
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  )
}

export default ModalEditProfile