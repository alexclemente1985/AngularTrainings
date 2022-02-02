export default {
   SERVER_BASE_URL: "http://localhost:3000",
   routes:{
      API: "/api", 
      AUTH: "/auth",
   },
   api_routes:{
      PEOPLE: "/people",
      PRODUCTS: "/products"
   },
   auth_routes:{
      LOGIN: "/login",
      REGISTER: "/register"
   },
   error_msgs:{
      server:{
         PEOPLE_API_ERROR: "People api error.",
         PRODUCTS_API_ERROR: "Products api error.",
      },
      auth:{
         LOGIN: "Login Error",
         REGISTER: "Register Error!"
      }
      
   },
   success_msgs:{
      SUCCESS_REGISTER: "Successfully registered. Use your credentials to log in",
      SUCCESS_LOGGED: "Logged in successfully. Welcome %s!"
   }

}