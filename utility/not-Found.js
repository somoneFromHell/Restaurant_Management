const notFound = (req,res) => res.status(400).send('route not found')

module.exports.notFound = notFound