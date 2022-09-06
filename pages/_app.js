import '../src/styles/globals.css';
import '../src/styles/fontawesome/css/all.css';
import Layout from '../src/components/Layout';
import Meta from '../src/components/Meta';

function MyApp({ Component, pageProps }) {
	return (
		<div className="App">
			<Meta
				title={'Medical Site'}
				description={'Mabifus Medical Site'}
				keywords={
					'mabifus, mabifus medical, mabifus medical page, ilorin, taiwo, unity, x-ray, radiogrpahy, scan'
				}
			/>
			<Layout>
				<Component {...pageProps} className="container" />
			</Layout>
		</div>
	);
}

export default MyApp;
