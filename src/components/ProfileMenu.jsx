import React from 'react'

const ProfileMenu = ({num, text}) => {
  return (
    <div className='text-center'>
        <span className='text-base font-semibold'>{num}</span>
        <p className='text-sm text-slate-500 font-normal'>{text}</p>
    </div>
  )
}

export default ProfileMenu