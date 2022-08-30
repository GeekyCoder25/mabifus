import Head from '../src/components/Meta';
import Header from '../src/components/Header';
import Tests from '../src/components/Tests';
import ChartContainer from '../src/components/Chartconatiner';

// export const getStaticProps = async () => {
// 	const res = await fetch('/api/test');
// 	const data = await res.json();
// 	return {
// 		props: { testsdata: data },
// 	};
// };

function Home({ testsdata }) {
	return (
		<section className="home">
			<Head title="Homepage" content="Homepage" />
			<Header />
			{testsdata && <Tests tests={testsdata} />}
			<ChartContainer />
		</section>
	);
}

export default Home;
