import Head from '../src/components/Meta';
import Header from '../src/components/Header';
import Tests from '../src/components/Tests';
import ChartContainer from '../src/components/Chartconatiner';
import Choose from '../src/components/Choose';
import Offer from '../src/components/Offer';
import Covid from '../src/components/Covid';
import { useEffect, useState } from 'react';

export const getStaticProps = async () => {
	const res = await fetch('https://panicky-fly-pea-coat.cyclic.app/api/tests');
	const data = await res.json();
	return {
		props: { testsdata: data },
	};
};
function Home({ testsdata }) {
	const [handleUserSignIn, sethandleUserSignIn] = useState(false);
	useEffect(() => {}, []);
	const [username, setusername] = useState('');

	useEffect(() => {
		const emailLocalStorageCheck = localStorage.getItem('mabifusUserToken');
		emailLocalStorageCheck
			? sethandleUserSignIn(true)
			: sethandleUserSignIn(false);
		emailLocalStorageCheck &&
			fetch(
				`https://panicky-fly-pea-coat.cyclic.app/api/user/${localStorage.getItem(
					'mabifusUserToken'
				)}`
			)
				.then(res => res.json())
				.then(data => setusername(`${data.firstname} ${data.lastname}`));
	}, [setusername]);
	return !testsdata || (!username && handleUserSignIn) ? (
		<div className="pageLoading">
			<div>
				Loading
				<span className="dotTypingPageLoading"></span>
			</div>
		</div>
	) : (
		<section className="home">
			<Head title="Homepage" description={'Mabifus Medical Dashboard'} />
			<Header username={username} />
			{testsdata && <Tests tests={testsdata} />}
			<ChartContainer />
			<Choose />
			<Covid />
			<Offer />
		</section>
	);
}

export default Home;
