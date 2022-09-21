// import { useEffect, useState } from 'react';

// const CandT = () => {
// 	const [dataFetch, setdataFetch] = useState(' ');
// 	useEffect(() => {
// 		const options = {
// 			method: 'GET',
// 			headers: {
// 				'X-RapidAPI-Key': 'fc4041d89dmshbf4c78c23ba25b9p16a0fcjsnb76704b2032f',
// 				'X-RapidAPI-Host': 'priaid-symptom-checker-v1.p.rapidapi.com',
// 			},
// 		};
// 		fetch(
// 			'https://priaid-symptom-checker-v1.p.rapidapi.com/symptoms/31/man?language=en-gb',
// 			options
// 		)
// 			.then(res => res.json())
// 			.then(data => console.log(data))
// 			.then(data => setdataFetch(data))
// 			.catch(err => console.error(err));
// 	}, []);
// 	return <article style={{ marginTop: '300px' }}>{dataFetch}</article>;
// };

// export default CandT;
