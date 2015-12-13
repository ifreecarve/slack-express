import save from './save'
import _api from './_api'
import _token from './_token'

function test(token, callback) {
  let url = 'https://slack.com/api/auth.test'
  _api(url, token, callback)
}

// register app to a slack team
export default function register(code, callback) {
  _token(code, (err, access_token)=> {
    if (err) {
      callback(err)
    }
    else {
      let token = access_token
      let owner = true

      test(token, (err, acct)=> {
        if (err) {
          callback(err)
        }
        else {
          let user_id = acct.user_id
          let team_id = acct.team_id

          save({token, owner, user_id, team_id}, callback)
        }
      })
    }
  })
}
