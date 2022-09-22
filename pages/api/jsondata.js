import data from '../../src/data/mabifusdb.json';

export default function handler(req, res) {
	if (req.method === 'GET') {
		res.status(200).json(data);
	}
}
