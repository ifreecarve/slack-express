# slack-express [![bitHound Overalll Score](https://www.bithound.io/github/smallwins/slack-express/badges/score.svg)](https://www.bithound.io/github/smallwins/slack-express) [![bitHound Dependencies](https://www.bithound.io/github/smallwins/slack-express/badges/dependencies.svg)](https://www.bithound.io/github/smallwins/slack-express/master/dependencies/npm) [ ![Codeship Status for smallwins/slack-express](https://codeship.com/projects/8348a860-7a10-0133-8cf8-72bb2b768401/status?branch=master)](https://codeship.com/projects/118901)

**Warning! This is massively alpha and aiming to ship this week at JSCONF. If you found this: good for you! Please don't share widely!!**

Quickly implement a Slack slash commands as Express middleware.

### hello world

Define a handler for `/echo` slash command:

```javascript
import slack, {slash, start} from 'slack-express'

slash('/echo', (payload, message)=> {
  // payload recieved as a POST from Slack command issued
  let cmd = payload.raw.command
  // sends a response to the Slack user
  message({text:`Echo to Slack! ${cmd}`})
})

start()
```

Now any Slack user issuing `/echo` slash command will recieve "Echo to Slack! /echo" message.

#### generated routes

Under the hood `slack-express` is just an Express app that generates Slack API friendly routes for authenticating an app and recieving incoming webhooks.

- `GET /` Displays a generated install page with an Add to Slack button
- `GET /auth` Auth callback from the Add to Slack button
- `POST /` Executes slash command middlwares

The `slack` object is an Express app so you can mount it on an existing app with `app.use` or extend with regular web routes for doing things like authenticating 3rd party services. 

```javascript
import express from 'express'
import slack from 'slack-express'

// register a slash command handler
slack.slash('/rad', (payload, message)=> {
  message({text:'rad indeed!'})
})

// create a fresh express app
let app = express()

// mount the slash commands on the /rad route
app.use('/rad', slackApp)

// add other routes and junk per norms
app.get('/', (req, res)=> res.end('index page'))

// as you do
app.listen(3777)
```

### middleware

OH BTW. The `slack.slash` function can accept any number of slash command middlewares. Symmetry with Express aside, the `slack-express` middleware sub stack is a nice pattern for flow control, data transform pipelines and helps guide app modularization. Check it out:

```javascript
import slack from 'slack-express'

function logger(payload, message, next) {
  payload.custom = 'thing'
  console.log(payload)
  next()
}

function hello(payload, message) {
  message({
    text: 'hello world'
  })
}

slack.slash('/hi', logger, hello)

slack.start()
```

### the payload

The `payload` parameter in the `slack.slash` callback contains all the information from the slash command.

```javascript
import slack from 'slack-express'

slack.slash('/console.log', (payload, message)=> {
  // payload keys
  let {ok, raw, message, account} = payload
  // old school print styles debugger aw shiii
  message({text:`${JSON.stringify(payload, null, 2)}`})
})

slack.start()
```

Use it to process the command and respond using [Slack message formatted JSON](https://api.slack.com/docs/formatting) `message()`. 

### persistence

Slack slash commands are issued by real humans and you may wish to associate information with them; databases are good for that. You can find and store data for each Slack account interacting with your app by using `find` and `save`. 

### api

```
slack
  slash .... Register a slash command handler
  start .... Starts up the app
  button ... Add to Slack button for your app
  find ..... Find a saved Slack account
  save ..... Save a Slack account

```

## local setup

You need to create an app with Slack for a `SLACK_CLIENT_ID` and `SLACK_CLIENT_SECRET`. Then you will need to create a `.env` file with the following:

```
NODE_ENV=development
SLACK_CLIENT_ID=your-slack-client-id-here
SLACK_CLIENT_SECRET=your-slack-client-secret-here
AWS_REGION=us-east-1
SECRET=your-secret-text-here

```

Don't forget to add `.env` to your `.gitignore`.

### database setup

- todo dynamo setup here
- todo redis seetup here

## deploy

- todo aws here
- todo heroku here
- todo digital ocean here

