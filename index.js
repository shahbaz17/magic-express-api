const { Magic } = require('@magic-sdk/admin')
const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT || 9000
const key = process.env.MAGIC_SECRET_KEY

// Initiating Magic instance for server-side methods
const magic = new Magic(key)

app.get('/', (req, res) => {
	res.send('Hello BeJS!')
})

app.get('/secret', isAuthorized, (req, res) => {
	res.json({
		message: 'Super Secret Information',
	})
})

app.listen(port, () => console.log(`Server is listening on ${port}:`))

// isAuthorized middleware
async function isAuthorized(req, res, next) {
	if (req.headers.authorization !== undefined) {
		try {
			const didToken = req.headers.authorization.split(' ')[1]
			await magic.token.validate(didToken)
			return next()
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	} else {
		res.status(500).json({ message: 'Authorization Header required' })
	}
}
