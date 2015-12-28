import scmp from 'scmp'

export default function verify(req, res, next) {
  let mode = process.env.NODE_ENV
  let legit = scmp(req.body.token, process.env.SLACK_VERIFICATION_TOKEN)
  if (mode === 'production') {
    next(legit? null : Error('token not verified'))
  }
  else {
    next()
  }
}
