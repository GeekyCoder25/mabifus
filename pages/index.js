import Head from '../src/components/Meta';
import Header from '../src/components/Header';
import Tests from '../src/components/Tests';
import ChartContainer from '../src/components/Chartconatiner';

export const getStaticProps = async () => {
	const res = await fetch('http://localhost:3000/api/test');
	const data = await res.json();
	return {
		props: { testsdata: data },
	};
};

function Home({ testsdata, firstname, lastname }) {
	return (
		<section className="home">
			<Head title="Homepage" content="Homepage" />
			<Header firstname={firstname} lastname={lastname} />
			{testsdata && <Tests tests={testsdata} />}
			<ChartContainer />
		</section>
	);
}

export default Home;
