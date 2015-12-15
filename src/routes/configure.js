import express from 'express'
import parser from 'body-parser'
import logger from 'morgan'
import path from 'path'
import button from '../methods/button'
import index from '../routes/index'
import slash from '../routes/slash'
import install from '../routes/install'
import verify from '../routes/verify'
import fs from 'fs'

let bb = express()
bb.set('template', 'slack-express')

// default template locals
bb.locals.ok = true
bb.locals.msg = ''
bb.locals.button = button
bb.locals.scope = 'incoming-webhook,commands'

// default views
bb.set('view engine', 'ejs')
bb.set('views', path.join(__dirname, '..', 'views'))

function ensureTemplate(template) {
  fs.stat(template, function(err, stats) {
    if (err) {
      console.error(`Supplied template not found at ${template}. Using default. Please check your template path. Thanks!`)
    } else if (stats.isFile()) {
      bb.set('template', template)
    }
  })
}

// override view settings from parent app
bb.on('mount', parent=> {
  let parentTemplate = parent.get('template')
  if (!parentTemplate) { return }
  ensureTemplate(parentTemplate)
})

function validateEnv(req, res, next) {
  let required = ['NODE_ENV', 'APP_NAME', 'SLACK_CLIENT_ID', 'SLACK_CLIENT_SECRET']
  let bad = required.filter(k=> typeof process.env[k] === 'undefined')
  let err = bad.length? Error(`missing env vars: ${bad.join(', ')}`) : null
  // force the client_id
  bb.locals.client_id = process.env.SLACK_CLIENT_ID
  next(err)
}

// middlewares
bb.use(validateEnv)
bb.use(logger('dev'))
bb.use(parser.json())
bb.use(parser.urlencoded({extended:true}))

// default routes
bb.get('/', index)
bb.post('/', verify, slash)
bb.get('/auth', install)

export default bb
