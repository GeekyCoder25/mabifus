import data from '../../../src/data/doctorsdb.json';
export default function handler(req, res) {
	res.status(200).json(data.doctors);
}
