import data from '../../src/data/db.json';
export default function handler(req, res) {
	res.status(200).json(data.tests);
	// console.log(data.tests)
}
