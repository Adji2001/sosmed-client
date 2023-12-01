const EmptyMessage = () => {
  return (
    <div className="flex-[13] pt-3 pb-5 px-5 flex flex-col items-center justify-center">
        <h1 className="text-4xl text-slate-400 font-bold mb-5">Welcome to &quot;Batur Luah App&quot;</h1>
        <img 
            className="w-6/12 object-cover"
            src={`${import.meta.env.VITE_CURRENT_URI}chatbox.svg`} alt="no chat" 
        />
    </div>
  )
}

export default EmptyMessage