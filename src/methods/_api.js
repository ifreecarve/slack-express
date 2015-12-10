import req from 'request'
import path from 'path'

// make an api call
//
// usage:
//
//   api('https://slack.com/api/api.test', 'fake-token', (err, data)=> {
//
//   })
//
export default function api(url, tokenOrCode, callback) {
  // defaults
  let client_id = process.env.SLACK_CLIENT_ID
  let client_secret = process.env.SLACK_CLIENT_SECRET
  let headers = {Accept: 'application/json'}

  let json = true
  let isCode = url === 'https://slack.com/api/oauth.access'
  let form = {client_id, client_secret}
  if (isCode) {
    form.code = tokenOrCode
  }
  else {
    form.token = tokenOrCode
  }
  let query = {url, headers, form, json}
  req.post(query, (err, res)=> {
    if (err) {
      callback(err)
    }
    else if (res.body.error) {
      callback(res.body.error)
    }
    else {
      let json = res.body
      delete json.ok
      callback(null, json)
    }
  })
}
