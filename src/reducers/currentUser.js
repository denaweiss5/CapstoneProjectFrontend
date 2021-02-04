const users = (state = null, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return {
                id: action.user.id,
                email: action.user.email,
                name: action.user.name
            }
        case 'LOGOUT_USER':
            return null
        case 'CREATE_USER':
            return {
                id: action.user.id,
                email: action.user.email,
                name: action.user.name
            }
        default:
            return state
    }
}

export default users