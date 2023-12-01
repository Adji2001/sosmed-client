import CardPost from './CardPost'

const AlertPosts = () => {
  return (
    <div className='my-4'>
        <div className='flex justify-between items-center'>
            <h3 className='font-semibold'>Today on selection</h3>
            <button className='text-sm bg-slate-500 text-white px-2 py-1 rounded-full'>View All</button>
        </div>
        <div className='flex flex-col my-4'>
            <CardPost />
        </div>
    </div>
  )
}

export default AlertPosts