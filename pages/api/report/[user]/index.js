import data from '../../../../src/data/db.json';
const fs = require('fs');

export default function handler(req, res) {
	const selectUser = data.users.find(
		email => `${email._id}` === req.query.user
	)?.report;
	if (req.method === 'GET') {
		res.status(200).json(selectUser);
		console.log('report data fetched sucessfully');
	} else if (req.method === 'POST') {
		const newReport = {
			title: req.body.title,
			size: req.body.size,
			_id: req.body._id,
		};
		selectUser.push(newReport);
		fs.writeFile(
			'./src/data/db.json',
			JSON.stringify(data),
			err => err && console.log(err)
		);
		res.status(201).json(newReport);
		console.log('report data updated sucessfully');
	}
}
