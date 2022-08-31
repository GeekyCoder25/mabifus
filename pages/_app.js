import '../src/styles/globals.css';
import '../src/styles/fontawesome/css/all.css';

import Layout from '../src/components/Layout';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
	const [handleUserSignIn, sethandleUserSignIn] = useState(false);
	const [handleFirstname, setFirstname] = useState('');
	const [handleLastname, setLastname] = useState('');
	return (
		<div className="App">
			<Layout handleUserSignIn={handleUserSignIn}>
				<Component
					{...pageProps}
					className="container"
					sethandleUserSignIn={sethandleUserSignIn}
					firstname={handleFirstname}
					lastname={handleLastname}
					setFirstname={setFirstname}
					setLastname={setLastname}
				/>
			</Layout>
		</div>
	);
}

export default MyApp;
