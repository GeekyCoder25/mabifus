import data from '../../src/data/mabifusdb.json';
export default function handler(req, res) {
	res.status(200).json(data.tests);
}
