import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
	const { pathname } = useRouter();
	return (
		<>
			{pathname !== '/' && pathname !== '/404' && <Navbar />}
			{children}
			{pathname !== '/' && pathname !== '/404' && <Footer />}
		</>
	);
};

export default Layout;
