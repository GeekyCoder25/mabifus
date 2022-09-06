import Head from 'next/head';

const Meta = ({ title, description, keywords }) => {
	return (
		<Head>
			<title>{`Mabifus | ${title}`}</title>
			<meta name="description" content={`Mabifus ${description}`} />
			<meta name="keywords" content={keywords} />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
};

Meta.defaultProps = {
	title: 'Welcome',
	description: 'Mabifus Medical Blog',
keywords: 'mabifus, mabifus medical, mabifus medical page,',
};
export default Meta;
