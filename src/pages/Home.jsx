import { useEffect, useState } from "react"
import Feeds from "../components/Feeds"
import RightBar from "../components/RightBar"
import Topbar from "../components/Topbar"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../redux/posts/action"
import LogoutButton from "../components/atoms/LogoutButton"
import SearchInput from "../components/atoms/SearchInput"
import { getFilteredPosts } from "../filteredPosts"
import 'react-loading-skeleton/dist/skeleton.css'

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const user = useSelector((states) => states.authUser)
  const posts = useSelector((states) => getFilteredPosts(states.posts, keyword))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPosts(user._id))

  }, [dispatch, user])

  const setDescHandler = (e) => {
    setKeyword(e)
  }

  return (
      <div className="flex w-[100%] overflow-hidden rounded-2xl bg-opacity-60 bg-slate-700 border border-slate-500" style={{backdropFilter: "blur(20px)"}}>
        <div className="flex-[9] overflow-y-auto p-6 border-r border-slate-500">
          <Topbar logoutElement={<LogoutButton />} searchElement={<SearchInput desc={keyword} setDesc={setDescHandler} />} />
          { posts.length === 0 ? (
            <p className="text-slate-400 text-3xl font-bold">No post found</p>
          ) : (
            posts.map((post) => (
              <Feeds key={post._id} post={post} />
            )) 
          )}
        </div>
        <div className="flex-[3] overflow-y-auto p-2">
          <RightBar />
        </div>
      </div>
  )
}

export default Home