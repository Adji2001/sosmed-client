export const getAccessToken = () => {
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    
    return authUser ? authUser : {user: null}
}