import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
	const [colorScheme, setColorScheme] = useState('light');
	const { pathname } = useRouter();
	const noNavFooter = ['/signin', '/signup', '/404'];

	useEffect(() => {
		const defaultColorScheme = window.matchMedia(
			'(prefers-color-scheme: dark)'
		);
		const theme = localStorage.getItem('theme');
		if (theme) {
			document.body.classList.add(theme);
			theme === 'dark' && setColorScheme('dark');
		} else if (defaultColorScheme.matches) {
			document.body.classList.add('dark');
			setColorScheme('dark');
		} else document.body.classList.add('light');
	}, []);
	const handleMode = () => {
		if (document.body.classList.contains('dark')) {
			document.body.classList.replace('dark', 'light');
			localStorage.setItem('theme', 'light');
		} else {
			document.body.classList.replace('light', 'dark');
			localStorage.setItem('theme', 'dark');
		}
		colorScheme === 'dark' ? setColorScheme('light') : setColorScheme('dark');
	};

	return (
		<>
			{!noNavFooter.includes(pathname) && <Navbar handleMode={handleMode} />}
			{children}
			{!noNavFooter.includes(pathname) && (
				<div className="colorScheme" onClick={handleMode}>
					<i
						className={`fas fa-${
							colorScheme === 'dark' ? 'circle-half-stroke' : 'moon'
						}`}
					></i>
				</div>
			)}
			{!noNavFooter.includes(pathname) && <Footer />}
		</>
	);
};

export default Layout;
