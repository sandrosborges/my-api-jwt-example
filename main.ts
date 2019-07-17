import {Server} from './server/server'
import {userRouter} from "./user/user.router"
import {testRouter} from "./server/test.router"
import {authRouter} from "./security/auth.router"

const server = new Server()

server.bootstrap([userRouter, testRouter,authRouter]).then(server=>{

  console.log('Server is listening on:', server.application.address())
  
}).catch(error => {
  console.log('server failed tl start.')
  console.error(error)
  process.exit(1)
})