import { users } from '../../../src/data/db';

export default function handler(req, res) {
	const { usersId } = req.query;
	if (req.method === 'GET') {
		const userFetch = users.find(i => i.id.slice(0, -4) === usersId);
		console.log(usersId);
		res.status(200).json(userFetch);
	}
}

// else if (req.method === 'DELETE') {
// 	const reportDeleted = users.find(i => i.id === usersId);
// 	const reportDeleteIndex = users.findIndex(i => i.id === usersId);

// 	users.splice(reportDeleteIndex, 1);
// 	res.status(200).json(reportDeleted);
// }
