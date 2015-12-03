import path from 'path'
import test from 'tape'
import env from 'node-env-file'
import request from 'request'
import slack from '../'
// import save from '../src/adapters/dynamo/save'
// import find from '../src/adapters/dynamo/find'
// import install from '../src/methods/_install'

// if we're in dev grab env vars from .env
let mode = process.env.NODE_ENV
let isDev = typeof mode === 'undefined' || mode === 'development'
let isTesting = mode === 'testing'

test('env sanity', t=> {
  let server = slack.start()
  if (isTesting) {
    t.ok(true, 'we are in the codeship!')
    t.end()
  }
  else {
    request('http://localhost:3000', (err, res)=> {
      if (err) {
        t.fail(err, err)
      }
      else {
        t.equals(res.statusCode, 500, 'env ')
        console.log(res.body)
      }  
      server.close()
      t.end()
    })
  }
})

test('loads env', t=> {
  function gimme200() {
    let server = slack.start()
    request('http://localhost:3000', (err, res)=> {
      if (err) {
        t.fail(err, err)
      }
      else {
        t.equals(res.statusCode, 200, 'env ')
        console.log(res.body)
      }  
      server.close()
      t.end()
    })
  }
  if (isDev) {
    env(path.join(process.cwd(), '.env'))
    gimme200()
  }
  else if (isTesting) {
    gimme200()
  }
  else {
    t.ok(true, 'is ok')
    t.end()
  }
})

