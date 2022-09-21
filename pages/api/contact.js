import data from '../../src/data/contactdb.json';
const fs = require('fs');

export default function handler(req, res) {
	let contactForm = data.contactForm;

	if (req.method === 'GET') {
		res.status(200).json(contactForm);
	} else if (req.method === 'POST') {
		const contactUpdate = {
			name: req.body.name,
			email: req.body.email,
			message: req.body.message,
		};
		contactForm.push(contactUpdate);
		fs.writeFile(
			'./src/data/contactdb.json',
			JSON.stringify(data),
			err => err && console.log(err)
		);
		res.status(201).json(contactForm);
		console.log('contact data updated sucessfully');
	} else if (req.method === 'DELETE') {
		res.status(204).json('Delete Successful');
		contactForm.length = 0;
		fs.writeFile(
			'./src/data/contactdb.json',
			JSON.stringify(data),
			err => err && console.log(err)
		);
	}
}
