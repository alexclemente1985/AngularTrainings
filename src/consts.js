module.exports={
    bcryptSalts: 10,
    expiresJWT: 7200,
    error_msgs:{
        EMAIL_ALREADY_REGISTERED: {
            code: 1,
            msg: "Error while saving the user"
        },
        ERROR_WHILE_SAVING_USER: {
            code: 2,
            msg: "Error while saving the user"},
        SERVER_ERROR: {
            code: 3,
            msg: "Server error"
        },
        BAD_GATEWAY: {
            code: 4, 
            msg: "Bad gateway"
        },
        WRONG_EMAIL_PASSWORD: {
            code: 5, 
            msg: "Wrong e-mail or password"
        },
        TOKEN_NOT_FOUND: {
            code: 6,
            msg: "Token not found."
        },
        WRONG_TOKEN: {
            code: 7, 
            msg: "Wrong token. Authentication error."
        },
        ERROR_WHILE_FETCHING_USER_DATA: {
            code: 8,
            msg: "Error while trying to fetch user data"
        }
    },
    http_status:{
        success:{
            OK: 200,
            CREATED: 201
        },
        client_errors:{
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404
        },
        server_errors:{
            INTERNAL_SERVER_ERROR: 500,
            BAD_GATEWAY: 502,
            SERVICE_UNAVAILABLE: 503
        },
    },
    routes:{
        api:{
            PEOPLE: "/people",
            PRODUCTS: "/products",
        },
        auth:{
            LOGIN: "/login",
            REGISTER: "/register",
            USER: "/user"
        },
        
    }
}