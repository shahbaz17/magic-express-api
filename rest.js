const { Magic } = require('@magic-sdk/admin')
const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT || 9000
const key = process.env.MAGIC_SECRET_KEY

// enables parsing of json object in the body of the request
app.use(express.json())

// Initiating Magic instance for server-side methods
const magic = new Magic(key)

// List of talks
let talks = [
	{
		id: 1,
		title: 'Secure Node.js APIs with DID Token',
		type: 'Meetup',
		venue: 'BeJS',
		status: 'upcoming',
	},
	{
		id: 2,
		title: 'Secure Go APIs with DID Token',
		type: 'Conference',
		venue: 'Go Conf Tokyo',
		status: 'live',
	},
	{
		id: 3,
		title: 'React User Authentication with Magic',
		type: 'Conference',
		venue: 'React Conf Online',
		status: 'done',
	},
]

app.get('/', (req, res) => {
	res.send('Hello BeJS!')
})

app.get('/api/talks', isAuthorized, (req, res) => {
	res.status(200).send(talks)
})

app.get('/api/talks/:id', isAuthorized, (req, res) => {
	const talk = talks.find((t) => t.id === parseInt(req.params.id))
	if (!talk)
		res.status(404).send(`Talk with the id ${req.params.id} was not found.`)
	res.status(200).send(talk)
})

app.post('/api/talks', isAuthorized, (req, res) => {
	if (
		!req.body.title ||
		!req.body.type ||
		!req.body.venue ||
		!req.body.status
	) {
		res.status(400).send('Title, Type, Venue or status missing.')
		return
	}
	const talk = {
		id: talks.length + 1,
		title: req.body.title,
		type: req.body.type,
		venue: req.body.venue,
		status: req.body.status,
	}
	talks.push(talk)
	res.send(talk)
})

app.put('/api/talks/:id', isAuthorized, (req, res) => {
	const talk = talks.find((t) => t.id === parseInt(req.params.id))
	if (!talk) {
		return res
			.status(404)
			.send(`Talk with the id ${req.params.id} was not found.`)
	}

	if (req.body.title) {
		talk.title = req.body.title
	}
	if (req.body.type) {
		talk.type = req.body.type
	}
	if (req.body.venue) {
		talk.venue = req.body.venue
	}
	if (req.body.status) {
		talk.status = req.body.status
	}

	res.send(talk)
})

app.delete('/api/talks/:id', isAuthorized, (req, res) => {
	const talk = talks.find((t) => t.id === parseInt(req.params.id))
	if (!talk) {
		return res
			.status(404)
			.send(`Talk with the id ${req.params.id} was not found.`)
	}

	const index = talks.indexOf(talk)
	talks.splice(index, 1)

	res.send(talk)
})

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

app.listen(port, () => console.log(`Server is listening on ${port}:`))
