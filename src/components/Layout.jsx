import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';

const Layout = ({ children, handleUserSignIn }) => {
	const { pathname } = useRouter();
	// const noNavFooter = ['/signin', '/signup', '/404']
	return (
		<>
			{pathname !== '/signin' &&
				pathname !== '/signup' &&
				pathname !== '/404' && <Navbar handleUserSignIn={handleUserSignIn} />}
			{children}
			{pathname !== '/signin' &&
				pathname !== '/signup' &&
				pathname !== '/404' && <Footer />}
		</>
	);
};

export default Layout;
