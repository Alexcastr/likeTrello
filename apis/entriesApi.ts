import axios from "axios";

// como la api sale del mismo dominio no es necesario poner la url completa http://localhost:3000/api/entries
const entriesApi= axios.create({
    baseURL: "https://z8jpaiv8m8.execute-api.us-east-1.amazonaws.com/",
   
});

export default entriesApi
