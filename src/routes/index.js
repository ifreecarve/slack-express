export default function index(req, res) {
  let templateName = process.env.APP_NAME
  res.render(templateName)
}
