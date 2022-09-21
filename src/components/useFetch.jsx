X-Ray Scan Report.pdfimport { useEffect, useState } from 'react';

const useFetch = url => {
	const [username, setusername] = useState('');
	const [data, setdata] = useState('');
	// const userData = async () => {
	// 	const res = await fetch(
	// 		`http://localhost:3000/api/profile/toyibe25@gmail.com`
	// 	);
	// 	const data = await res.json();
	// 	return data;
	// };
	// return userData().then(data => data);
	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then(data => {
				return (
					setdata(data), setusername(`${data.firstname}  ${data.lastname}`)
				);
			});
	}, [url]);
	return { data, username };
};

export default useFetch;
