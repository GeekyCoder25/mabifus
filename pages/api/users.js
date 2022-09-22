import data from '../../src/data/mabifusdb.json';

const fs = require('fs');

export default function handler(req, res) {
	if (req.method === 'GET') {
		res.status(200).json(data.users);
	} else if (req.method === 'POST') {
		const newUser = {
			_id: req.body.id,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: req.body.password,
			dob: '',
			gender: '',
			phonenumber: '',
			bloodgroup: '',
			bloodtype: '',
			height: '',
			weight: '',
			report: [
				{ title: 'Blood Pressure Report', size: '2 Mb', _id: 1 },
				{ title: 'Heart Rate Report', size: '70 Kb', _id: 2 },
				{ title: 'Glucose Level Report', size: '155 Kb', _id: 3 },
				{ title: 'Blood Count Report', size: '4 Mb', _id: 4 },
				{ title: 'X-Ray Scan Report', size: '9 Mb', _id: 5 },
				{
					title: 'You can add or delete your medical health reports here',
					size: '0.0 b',
					_id: 0,
				},
			],
			totalusers: data.users.length + 1,
		};

		data.users.push(newUser);
		fs.writeFile(
			'./src/data/mabifusdb.json',
			JSON.stringify(data),
			err => err && console.log(err)
		);
		res.status(201).json(newUser);
	} else if (req.method === 'DELETE') {
		res.status(204).json('Delete Successful');
		data.users.length = 0;
		fs.writeFile(
			'./src/data/mabifusdb.json',
			JSON.stringify(data),
			err => err && console.log(err)
		);
	}
}
