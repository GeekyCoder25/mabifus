import data from '../../data/doctorsdb.json';
export default function handler(req, res) {
	const selectUserDoctor = data.doctors.find(
		detail => detail.name === req.query.doctor
	);
	res.status(200).json(selectUserDoctor);
}
