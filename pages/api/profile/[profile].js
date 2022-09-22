import data from '../../../public/data/mabifusdb.json';
const fs = require('fs');

export default function handler(req, res) {
	let selectUser = data.users.find(
		email => `${email._id}` === req.query.profile
	);
	if (req.method === 'GET') {
		delete selectUser['password'];
		// delete selectUser['_id'];
		res.status(200).json(selectUser);
		console.log('profile data fetched sucessfully');
	} else if (req.method === 'POST') {
		// const profileUpdate = {
		// 	gender: req.body.gender,
		// 	test: req.body.test,
		// };
		// selectUser = { ...selectUser, ...req.body };
		selectUser.firstname = req.body.firstname;
		selectUser.lastname = req.body.lastname;
		selectUser.dob = req.body.dob;
		selectUser.gender = req.body.gender;
		selectUser.phonenumber = req.body.phonenumber;
		selectUser.bloodgroup = req.body.bloodgroup;
		selectUser.bloodtype = req.body.bloodtype;
		selectUser.gender = req.body.gender;
		selectUser.weight = req.body.weight;
		selectUser.height = req.body.height;
		// selectUser.push(profileUpdate);
		fs.writeFile(
			'./public/data/mabifusdb.json',
			JSON.stringify(data),
			err => err && console.log(err)
		);
		res.status(201).json(selectUser);
		console.log('profile data updated sucessfully');
	}
}
