import axios from "axios";

// como la api sale del mismo dominio no es necesario poner la url completa http://localhost:3000/api/entries
const entriesApi= axios.create({
    baseURL: "/api" 
});

export default entriesApi