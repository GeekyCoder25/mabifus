import data from '../../../src/data/db.json';

const fs = require('fs');

export default function handler(req, res) {
	if (req.method === 'GET') {
		res.status(200).json(data.users);
	} else if (req.method === 'POST') {
		const newUser = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: req.body.password,
			id: req.body.email,
			report: [
				{
					title: 'You can add or delete your medical health reports here',
					size: '0.0 b',
					id: 1,
				},
			],
		};

		data.users.push(newUser);
		fs.writeFile('./src/data/db.json', JSON.stringify(data), (err, data) => {
			err ? console.log(err) : console.log(data);
		});
		console.log(newUser);
		console.log(data);
		res.status(201).json(newUser);
		// 	if (err) console.log(err);
		// 	else console.log('file written:', data);
	}
}
