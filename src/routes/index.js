export default function index(req, res) {
  let template = req.app.get('template')
  res.render(template)
}
