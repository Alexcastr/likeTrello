import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
// the list of all allowed origins
const allowedOrigins = [
  'http://localhost:3000', 
  'https://w80sf88mec.execute-api.us-east-1.amazonaws.com', 

];

export function middleware(req: NextRequest) {
    // retrieve the current response
    const res = NextResponse.next()

    // retrieve the HTTP "Origin" header 
    // from the incoming request
    req.headers.get("origin")

    // if the origin is an allowed one,
    // add it to the 'Access-Control-Allow-Origin' header
    if (allowedOrigins.includes(origin)) {
      res.headers.append('Access-Control-Allow-Origin', origin);
    }

    // add the remaining CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    return res
}

// specify the path regex to apply the middleware to
export const config = {
    matcher: '/entries/:path'
}



// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   // esto pasa por todas las rutas por lo que vamos a espeficiar en el matcher que solo queremos que se aplique a una ruta o a varias rutas en especifico
//   if(request.nextUrl.pathname.startsWith('/api/entries/')) {
//     // remover esa parte de la url, para que solo quede el id
//       const id = request.nextUrl.pathname.replace('/api/entries/', '')
//       // La siguiente constante es para saber si el id es un id de mongo, si no es un id de mongo, entonces no es valido
//       const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
//       if(!checkMongoIDRegExp.test(id)) {
//         const url = request.nextUrl.clone()
//         url.pathname = '/api/bad-request'
//         url.search = `?message=Invalid ID: ${id}`
//         return NextResponse.rewrite(url)

//       }
//   }
  
//   return NextResponse.next()
// }

// // Esta configuración es por si solo queremos que se aplique a una ruta o a varias rutas en especifico
//  export const config = {
//   // para varios paths con un array
//   matcher: [
//     // '/api/:path', 
//     '/api/entries/:path']
 
//  }
