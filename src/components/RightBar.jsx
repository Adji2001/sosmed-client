import OnlineFriends from './OnlineFriends'
import AlertPosts from './AlertPosts'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const RightBar = () => {
  const user = useSelector((states) => states.authUser)
  const [friends, setFriends] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URI}api/users/friends/${user._id}`)
      .then((allFriends) => {
        setFriends(allFriends.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [user._id])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URI}api/users/all`)
      .then((allUsers) => {
        const allUsersData = allUsers.data.filter((userOrg) => userOrg._id !== user._id)
        setUsers(allUsersData)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [user._id])

  const filterByReference = (users, friends) => {
  let res = [];
  res = users.filter(el => {
      return !friends.find(element => {
          return element._id === el._id;
      });
  });
  return res;
  }
  const otherUsers = filterByReference(users, friends);

  return (
    <div className='text-slate-100 p-2'>
        <OnlineFriends friends={friends} otherUsers={otherUsers} />
        <AlertPosts />
    </div>
  )
}

export default RightBar