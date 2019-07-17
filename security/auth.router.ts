import { Router } from '../common/router'
import * as restify from 'restify'
import * as jwt from 'jsonwebtoken'
import {User} from '../user/user.model'
import * as restifyErrors from 'restify-errors'
import { environment } from '../common/environment';


class AuthRouter extends Router {

  applyRoutes(application: restify.Server) {

    application.post('/auth', (req, resp, next) => {
  
        let user = new User(req.body)

        if(user.email=='sandrosb@uol.com.br' && user.password=='123456')
        {
           let token = jwt.sign( {
                name: user.name,
                role: 'admin'
            }, environment.JWT_SECRET, { expiresIn: 60 * 2 })

           resp.json({user: user, authToken: token})
           return next()

        }else{
            return next(new restifyErrors.BadRequestError('Auth fail!'))
        }
      
    })
  }

}

export const authRouter = new AuthRouter()