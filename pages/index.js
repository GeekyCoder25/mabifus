import Head from '../src/components/Meta';
import Header from '../src/components/Header';
import Tests from '../src/components/Tests';
import ChartContainer from '../src/components/Chartconatiner';
import Choose from '../src/components/Choose';
import Offer from '../src/components/Offer';
import Covid from '../src/components/Covid';

/*export const getStaticProps = async () => {
	const res = await fetch('https://mabifus.vercel.app/api/test');
	const data = await res.json();
	return {
		props: { testsdata: data },
	};
};*/

function Home({ testsdata }) {
	return !testsdata ? (
		<div className="pageLoading">
			<div>
				Loading
				<span className="dotTypingPageLoading"></span>
			</div>
		</div>
	) : (
		<section className="home">
			<Head title="Homepage" description={'Mabifus Medical Dashboard'} />
			<Header />
			{testsdata && <Tests tests={testsdata} />}
			<ChartContainer />
			<Choose />
			<Covid />
			<Offer />
		</section>
	);
}

export default Home;
