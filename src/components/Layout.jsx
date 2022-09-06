import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';

const Layout = ({ children, handleUserSignIn }) => {
	const { pathname } = useRouter();
	const noNavFooter = ['/signin', '/signup', '/404'];
	return (
		<>
			{!noNavFooter.includes(pathname) && (
				<Navbar handleUserSignIn={handleUserSignIn} />
			)}
			{children}
			{!noNavFooter.includes(pathname) && (
				<Footer handleUserSignIn={handleUserSignIn} />
			)}
		</>
	);
};

export default Layout;
