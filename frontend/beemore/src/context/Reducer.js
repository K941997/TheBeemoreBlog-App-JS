//!Reducer - Phiên đăng nhập - Nối BackendFrontend:
const Reducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return{
                user: null,
                isFetching: true,
                error: false,
            };

        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                isFetching: false,
                error: false,
            };

        case "CURRENT_USER":
            return {
                ...state,
                user: action.payload,
            };

        case "LOGIN_FAIL":
            return{
                user: null,
                isFetching: false,
                error: true,
            };

        case "LOGOUT":
            return{
                user: null,
                isFetching: false,
                error: false,
            };
        
        case "GET_ALL_POSTS":
            return {
                ...state,
                user: action.payload
            };
        
        case "CREATE_ONE_POST":
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };

        case "UPDATE_ONE_POST":
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id
                        ? {...post, ...action.payload}
                        : post
                )
            };

        case "DELETE_ONE_POST":
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload._id),
            };
        
        case "ADD_FOLLOW": {
            const willFollowUser = action.payload;

            return {
                ...state,
                user: {
                    ...state.user,
                    user: {
                        ...state.user,
                        following: [...state.user.user.following, willFollowUser] 
                    }

                }
            }
        }
            
        default:
            return state;
    }
};


export default Reducer;