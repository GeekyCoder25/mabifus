import Head from 'next/head';

const Meta = ({ title, content }) => {
	return (
		<Head>
			<title>{`Mabifus | ${title}`}</title>
			<meta name="description" content={`Mabifus ${content}`} />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
};
Meta.defaultProps = {
	title: 'Welcome',
	content: 'Mabifus Medical Blog',
};
export default Meta;
