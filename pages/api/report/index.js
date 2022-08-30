import { report } from '../../../src/data/db';

export default function handler(req, res) {
	if (req.method === 'GET') {
		res.status(200).json(report);
	} else if (req.method === 'POST') {
		console.log(req.body);
		const newReport = {
			title: req.body.title,
			size: req.body.size,
			id: req.body.id,
		};
		report.push(newReport);
		res.status(201).json(newReport);
	}
}
