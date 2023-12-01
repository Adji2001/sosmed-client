import { getAccessToken } from "../../apiCalls"

const authUserReducer = (authUser = null, action = {}) => {
    switch (action.type) {
        case 'PRELOAD':
            return getAccessToken().user
        case 'SET_AUTH_USER': 
            return action.payload
        case 'UNSET_AUTH_USER':
            return null
        default:
            return authUser
    }
}

export default authUserReducer