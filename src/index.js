import app from './routes/configure'
import button from './methods/button'
import find from './methods/find'
import save from './methods/save'
import chalk from 'chalk'

let port = process.env.PORT || 3000
let cmds = {}

// returns the registered slash commands
export function cmds() {
  return cmds
}

// register a slash command
export function slash(...args) {
  let cmd = args.shift() // first arg is the cmd
  cmds[cmd] = args       // rest of them are middlewares
}

// starts the server 
export function start(name = process.env.APP_NAME || 'slack-app') {
  return app.listen(port, x=> {
    if (process.env.NODE_ENV === 'development') {
      let msg = chalk.green(`#!/${name}>`)
      let url = chalk.underline.cyan(`http://localhost:${port}`)
      console.log(`${msg} ${url}`)
    }
  })
}

// app declarative defn api
app.cmds   = cmds
app.slash  = slash
app.start  = start
app.button = button

// app account persistence apis
app.find   = find
app.save   = save

// the app, is just an express app
export default app
