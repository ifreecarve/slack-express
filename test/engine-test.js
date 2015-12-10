import path from 'path'
import test from 'tape'
import env from 'node-env-file'
import express from 'express'
import slack from '../'
import request from 'request'

// if we're in dev grab env vars from .env
let mode = process.env.NODE_ENV
let isDev = typeof mode === 'undefined' || mode === 'development'
let isTesting = mode === 'testing'
if (isDev) {
  env(path.join(process.cwd(), '.env'))
}

test('should override default template engine', t=> {
  let app = express()
  app.set('template', path.join(__dirname, './fixtures/win/views/slack-express.jade'))
  app.use('/', slack)
  let testServer = app.listen('3333', function() {
    request('http://localhost:3333', (err, res)=> {
      if(err) {
        t.fail(err, err)
      } else {
        t.equals(res.body.trim(), '<h1>JADE</h1>')
      }
      t.end()
      testServer.close()
    })
  })
})

