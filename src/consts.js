module.exports={
    bcryptSalts: 10,
    expiresJWT: 7200,
    error_msgs:{
        EMAIL_ALREADY_REGISTERED: "Email already registered",
        ERROR_WHILE_SAVING_USER: "Error while saving the user",
        SERVER_ERROR: "Server error",
        BAD_GATEWAY: "Bad gateway",
        WRONG_EMAIL_PASSWORD: "Wrong e-mail or password"

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
            REGISTER: "/register"
        }
        
        
    }
}