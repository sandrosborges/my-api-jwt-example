import { Router } from '../common/router'
import * as restify from 'restify'


class TestRouter extends Router {

  applyRoutes(application: restify.Server) {

    application.get('/ping', (req, resp, next) => {
  
          resp.json({ ping: 'OK' })  
          return next()
  
      })
  }

}

export const testRouter = new TestRouter()