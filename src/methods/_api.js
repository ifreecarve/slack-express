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
export default function api(url, token, callback) {
  // defaults
  let headers = {Accept: 'application/json'}
  let json = true
  let form = {token}
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
