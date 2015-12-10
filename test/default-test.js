import path from 'path'
import test from 'tape'
import env from 'node-env-file'
import express from 'express'
import slack from '../'
import request from 'request'
import fs from 'fs'

// if we're in dev grab env vars from .env
let mode = process.env.NODE_ENV
let isDev = typeof mode === 'undefined' || mode === 'development'
let isTesting = mode === 'testing'
if (isDev) {
  env(path.join(process.cwd(), '.env'))
}

test('should use default view', t=> {
  let app = express()
  app.set('views', path.join(__dirname, './fixtures/fail/views'))
  app.use('/', slack)
  let testServer = app.listen('3333', function() {
    request('http://localhost:3333', (err, res)=> {
      if(err) {
        t.fail(err, err)
      } else {
        let actual = '<h1>Install</h1>\n\n\n  <div style=color:green;>\n    \n  </div>\n\n\n<a href="https://slack.com/oauth/authorize?scope=incoming-webhook,commands&client_id=undefined">\n      <img alt="Add to Slack"\n        height="40"\n        width="139"\n        src="https://platform.slack-edge.com/img/add_to_slack.png"\n        srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x">\n    </a>'
        t.equals(res.body.trim(), actual.trim())
      }
      t.end()
      testServer.close()
    })
  })
})
