import req from 'request'

export default function token(code, callback) {

  // params
  let url = 'https://slack.com/api/oauth.access'
  let client_id = process.env.SLACK_CLIENT_ID
  let client_secret = process.env.SLACK_CLIENT_SECRET

  // defaults
  let headers = {Accept: 'application/json'}
  let json = true
  let form = {code, client_id, client_secret}
  let query = {url, headers, form, json}

  console.log(form)

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
        console.log('GOT TOKEN', json)
      callback(null, json.access_token)
    }
  })
}
