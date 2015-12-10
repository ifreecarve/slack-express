let scope = 'incoming-webhook,commands'

function button() {
  let client_id = process.env.SLACK_CLIENT_ID
  return (
    `<a href="https://slack.com/oauth/authorize?scope=${scope}&client_id=${client_id}">
      <img alt="Add to Slack"
        height="40"
        width="139"
        src="https://platform.slack-edge.com/img/add_to_slack.png"
        srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x">
    </a>`
  )
}

export default button
