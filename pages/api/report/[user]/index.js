import data from '../../../../src/data/db.json';
const fs = require('fs');

export default function handler(req, res) {
	const selectUser = data.users.find(
		email => email.id === req.query.user
	)?.report;
	if (req.method === 'GET') {
		res.status(200).json(selectUser);
		console.log('report data fetched sucessfully');
		console.log(selectUser);
	} else if (req.method === 'POST') {
		const newReport = {
			title: req.body.title,
			size: req.body.size,
			id: req.body.id,
		};
		selectUser.push(newReport);
		fs.writeFile(
			'./src/data/db.json',
			JSON.stringify(data),
			err => err && console.log(err)
		);
		res.status(201).json(newReport);
		console.log('report data updated sucessfully');
	} else if (req.method === 'DELETE') {
		const reportDeleted = selectUser.find(
			i => i.id === parseInt(req.query.user)
		);
		const reportDeleteIndex = data.report.findIndex(
			i => i.id === parseInt(req.query.user)
		);

		data.report.splice(reportDeleteIndex, 1);
		fs.writeFile(
			'./src/data/db.json',
			JSON.stringify(data),
			err => err && console.log(err)
		);
		res.status(200).json(reportDeleted);
	}
}
