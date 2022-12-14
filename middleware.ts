// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // esto pasa por todas las rutas por lo que vamos a espeficiar en el matcher que solo queremos que se aplique a una ruta o a varias rutas en especifico
  if(request.nextUrl.pathname.startsWith('/api/entries/')) {
    // remover esa parte de la url, para que solo quede el id
      const id = request.nextUrl.pathname.replace('/api/entries/', '')
      // La siguiente constante es para saber si el id es un id de mongo, si no es un id de mongo, entonces no es valido
      const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
      if(!checkMongoIDRegExp.test(id)) {
        const url = request.nextUrl.clone()
        url.pathname = '/api/bad-request'
        url.search = `?message=Invalid ID: ${id}`
        return NextResponse.rewrite(url)

      }
  }
  
  return NextResponse.next()
}

// Esta configuración es por si solo queremos que se aplique a una ruta o a varias rutas en especifico
 export const config = {
  // para varios paths con un array
  matcher: [
    // '/api/:path', 
    '/api/entries/:path']
 
 }