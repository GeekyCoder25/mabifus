import Link from 'next/link';
import { useEffect, useState } from 'react';
const Footer = () => {
	const [handleUserSignIn, sethandleUserSignIn] = useState(false);
	useEffect(() => {
		const user = localStorage.getItem('mabifusUserToken');
		user ? sethandleUserSignIn(true) : sethandleUserSignIn(false);
	}, []);

	return (
		<footer className="footer">
			<section>
				<div>
					<h1>Menu</h1>
					<p>
						<Link href="/">
							<a>About Mabifus</a>
						</Link>
					</p>
					<p>
						<Link href="/">
							<a>Advertisements</a>
						</Link>
					</p>
					<p>
						<Link href="/">
							<a>Doctors</a>
						</Link>
					</p>
					<p>
						<Link href="/">
							<a>Support</a>
						</Link>
					</p>
				</div>
				<div>
					<h1>Sections</h1>
					<p>
						<Link href="/">
							<a>Emergency and Surgery</a>
						</Link>
					</p>
					<p>
						<Link href="/">
							<a>Fitness</a>
						</Link>
					</p>
					<p>
						<Link href="/">
							<a>Pharmacy</a>
						</Link>
					</p>
					<p>
						<Link href="/">
							<a>Sick bay</a>
						</Link>
					</p>
				</div>
				<div>
					<h1>Contact US</h1>
					<p>
						<Link href="/">
							<a>+2349073002599</a>
						</Link>
					</p>
					<p>
						<Link href="/">
							<a>Contact@Mabifus.com</a>
						</Link>
					</p>
					<p onClick={() => localStorage.clear()}>
						<Link href="/signin">
							<a>{handleUserSignIn ? 'Logout' : 'Login'}</a>
						</Link>
					</p>
				</div>
				<div className="footer-icons">
					<h1>Socials</h1>
					<Link href="https://twitter.com/_GeekyCoder">
						<a>
							<i className="fab fa-twitter"></i>
						</a>
					</Link>
					<Link href="https://www.linkedin.com/in/toyib-lawal">
						<a>
							<i className="fab fa-linkedin"></i>
						</a>
					</Link>
					<Link href="https://github.com/GeekyCoder25">
						<a>
							<i className="fab fa-github"></i>
						</a>
					</Link>
					<Link href="https://facebook.com/lawal.toyyib.7">
						<a>
							<i className="fab fa-facebook"></i>
						</a>
					</Link>
				</div>
			</section>
			<hr />
			<div className="footer-base">
				<h1>Mabifus</h1>
				<p>&copy; Geeky Coder, 2022 All rights Reserved</p>
			</div>
		</footer>
	);
};

export default Footer;
