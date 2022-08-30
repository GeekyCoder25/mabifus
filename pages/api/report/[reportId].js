import { report } from '../../../src/data/db';

export default function handler(req, res) {
	const { reportId } = req.query;
	if (req.method === 'GET') {
		const reportDelete = report.find(i => i.id === parseInt(reportId));
		res.status(200).json(reportDelete);
	} else if (req.method === 'DELETE') {
		const reportDeleted = report.find(i => i.id === parseInt(reportId));
		const reportDeleteIndex = report.findIndex(
			i => i.id === parseInt(reportId)
		);

		report.splice(reportDeleteIndex, 1);
		res.status(200).json(reportDeleted);
	}
}
