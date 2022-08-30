import '../src/styles/globals.css';
import '../src/styles/fontawesome/css/all.css';

import Layout from '../src/components/Layout';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<div className='App'>
				<Component {...pageProps} className='container' />
			</div>
		</Layout>
	);
}

export default MyApp;
