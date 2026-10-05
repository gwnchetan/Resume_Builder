import jwt from 'jsonwebtoken'
import { JWTPayload } from '@/types/user.types'   
// the type we create in user.types.ts we are using it here by importing


// the jwt.sign method always returns the string that why we need to 
// pass after function closing braket 

// JWTPayload defines the structure of the payload.
// `payload` is one object containing userId and email. that we export from user.types.ts
// jwt.sign() takes this payload, signs it with the secret,
// and returns the generated JWT token.

export const genrateToken = (payload: JWTPayload): string =>{
        return jwt.sign(payload, process.env.JWT_SECRET!,{
        expiresIn: '1h'
    })
}

export const verifyToken = (token: string):any => {
    return jwt.verify(token,process.env.JWT_SECRET!)
}

