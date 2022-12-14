import type { NextApiRequest, NextApiResponse } from 'next'

// Toca crear este endpoint para que cuando se haga una peticion a una ruta que no existe, se muestre este mensaje, esta ruta viene con el middleware.ts
type Data = {
  ok: boolean
  message: string  | string[]
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  // Mediante el url voy a esperar un mensaje, si no viene un mensaje, entonces le voy a poner un mensaje por defecto
const {message= 'Bad Request'} = req.query
  res.status(400).json({ 
    ok: false, 
    message
  })
}