import { Router } from '../common/router'
import * as restify from 'restify'
import { User } from './user.model'


class UserRouter extends Router {

  applyRoutes(application: restify.Server) {

    application.get('/user', (req, resp, next) => {
        User.find().then(user => {
  
          resp.json(user)
  
          return next()
        }).catch(next)
      })


    application.post('/user', (req, resp, next) => {
    let user = new User(req.body)
        user.save().then(user => {
            resp.json(user)
            return next()
        }).catch(next)
        
    })

  }

}

export const userRouter = new UserRouter()