import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
	const [colorScheme, setColorScheme] = useState('light');
	const { pathname } = useRouter();
	const noNavFooter = ['/signin', '/signup', '/404'];

	useEffect(() => {
		const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
		const theme = localStorage.getItem('theme');
		if (theme) document.body.classList.add(theme);
		else if (colorScheme.matches) {
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
			<div className="colorScheme">
				<i
					className={`fas fa-${
						colorScheme === 'dark' ? 'moon' : 'circle-half-stroke'
					}`}
					onClick={handleMode}
				></i>
			</div>
			{!noNavFooter.includes(pathname) && <Footer />}
		</>
	);
};

export default Layout;
