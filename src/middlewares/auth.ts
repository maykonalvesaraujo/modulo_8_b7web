import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Auth = {
    private: (req: Request, res: Response, next: NextFunction)=>{
        let success = false;
        // Fazer verificações de Auth
        if( req.headers.authorization){
            const [ authType, token] = req.headers.authorization.split(' ');

            if( authType === 'Bearer'){
                // validando o token
                try{
                    JWT.verify( //verificar o token (saber se É válido)
                        token,
                        process.env.JWT_SECRET_KEY as string
                    );
                    success = true;

                } catch(err) {

                }
            }
        }

        if(success){
            next();
        }else {
            res.status(403) // Not Autorized
            res.json({ error: 'Usuário não autorizado'})
        }
    }
}