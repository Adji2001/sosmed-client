const SidebarButton = ({icon, title}) => {
  return (
    <div title={title} className='flex items-center justify-center h-10 w-10 text-slate-100 hover:bg-slate-600 rounded-full p-1 hover:cursor-pointer relative'>
        {icon}
    </div>
  )
}

export default SidebarButton