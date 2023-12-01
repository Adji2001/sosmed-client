import dateFormat from 'dateformat'

const ProfileCardInfo = ({icon, title, desc, birthday}) => {
  return (
    <div className='flex w-32 items-center gap-3'>
        <div className='w-8 h-8 bg-slate-200 text-xl flex items-center justify-center rounded-full'>
            {icon}
        </div>
        <div className='flex flex-col'>
            <h5 className='text-xs'>{birthday ? dateFormat(birthday, 'fullDate') : title}</h5>
            <span className='text-xs font-light'>{desc}</span>
        </div>
    </div>
  )
}

export default ProfileCardInfo