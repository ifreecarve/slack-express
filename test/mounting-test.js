import path from 'path'
import test from 'tape'
import env from 'node-env-file'
import slack from '../'
// import save from '../src/adapters/dynamo/save'
// import find from '../src/adapters/dynamo/find'
// import install from '../src/methods/_install'

// if we're in dev grab env vars from .env
let mode = process.env.NODE_ENV
let isDev = typeof mode === 'undefined' || mode === 'development' || mode === 'testing'

if (isDev) {
  env(path.join(process.cwd(), '.env'))
  console.log('ENV loading isDev')
}

test('sanity', t=> {
  // t.plan(3)
  // t.ok(save, 'there is a save')
  // t.ok(find, 'there is a find')
  // t.ok(install, 'there is a install')

  slack.start()

  t.end()
})

