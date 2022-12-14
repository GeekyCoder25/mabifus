import data from '../../../../src/data/mabifusdb.json';
const fs = require('fs');

export default function handler(req, res) {
	const { reportId } = req.query;
	const selectUser = data.users.find(
		email => `${email._id}` === req.query.user
	).report;
	if (req.method === 'GET') {
		const reportDelete = selectUser.find(i => i._id === parseInt(reportId));
		res.status(200).json(reportDelete);
	} else if (req.method === 'DELETE') {
		const reportDeleted = selectUser.find(i => i._id === parseInt(reportId));
		const reportDeleteIndex = selectUser.findIndex(
			i => i._id === parseInt(reportId)
		);

		selectUser.splice(reportDeleteIndex, 1);
		fs.writeFile(
			'./src/data/mabifusdb.json',
			JSON.stringify(data),
			err => err && console.log(err)
		);
		res.status(200).json(reportDeleted);
	}
}
