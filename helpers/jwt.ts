import jwt from "jsonwebtoken";


export const genJWT = ( uid: string, email: string ) => {
    
    const payload = { uid, email };
    
    return new Promise((resolve, reject) => {        
        jwt.sign(payload, process.env.DB_JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if( err ) reject('No se pudo generar el token')
            resolve(token);
        })

    })
}