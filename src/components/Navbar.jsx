import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Navbar = () => {
	const [handleUserSignIn, sethandleUserSignIn] = useState(false);

	useEffect(() => {
		const user = localStorage.getItem('username');
		user ? sethandleUserSignIn(true) : sethandleUserSignIn(false);
	}, []);
	const handleHamburger = () => {
		const navbar = document.querySelector('.nav ul');
		const navpage = document.querySelectorAll('.nav ul li');
		const bg = document.querySelector('.navbg');
		const bars = document.querySelector('nav .fa-bars');
		const xmark = document.querySelector('nav .fa-xmark');
		const signup = document.querySelector('.signup');
		const userLogo = document.querySelector('.navprofileimage');
		const signout = document.querySelector('.signout');
		navbar.classList.add('navpagemobile');
		navbar.classList.add('navpagemobileleft');
		navpage.forEach(navlink => {
			navlink.addEventListener('click', () => handleHamburgerClose());
			navlink.classList.add('navpagemobilelinks');
		});
		bg.classList.add('blurbg');
		bars.style.display = 'none';
		xmark.style.display = 'block';
		handleUserSignIn && signout.classList.add('signoutactive');
		document.body.classList.add('navbodymobile');
		!handleUserSignIn
			? (signup.style.display = 'flex')
			: (userLogo.style.display = 'none');
	};
	const handleHamburgerClose = () => {
		const navbar = document.querySelector('.nav ul');
		const navpage = document.querySelectorAll('.nav ul li');
		const bg = document.querySelector('.navbg');
		const bars = document.querySelector('nav .fa-bars');
		const xmark = document.querySelector('nav .fa-xmark');
		const signup = document.querySelector('.signup');
		const userLogo = document.querySelector('.navprofileimage');
		const signout = document.querySelector('.signout');
		setTimeout(() => {
			navbar.classList.remove('navpagemobile');
		}, 200);
		navbar.classList.remove('navpagemobileleft');
		navpage.forEach(i => i.classList.remove('navpagemobilelinks'));
		bg.classList.remove('blurbg');
		bars.style.display = 'block';
		xmark.style.display = 'none';
		handleUserSignIn && signout.classList.remove('signoutactive');
		document.body.classList.remove('navbodymobile');
		!handleUserSignIn
			? (signup.style.display = 'none')
			: (userLogo.style.display = 'block');
	};

	const handleSignout = () => {
		handleHamburgerClose();
		localStorage.clear();
	};
	return (
		<nav className="nav">
			<div className="bars">
				<i className="fas fa-bars" onClick={handleHamburger}></i>
				<i className="fas fa-xmark" onClick={handleHamburgerClose}></i>
			</div>
			<div className="navheader">
				<div className="navheaderprofile">
					{/* <Image src="/images/profile.png" alt="logo" width={72} height={72} /> */}
					<h1 className="navheadertext">MABIFUS</h1>
				</div>
			</div>
			<ul>
				<li>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href="/products">
						<a>Products</a>
					</Link>
				</li>
				<li>
					<Link href="/pricing">
						<a>Pricing</a>
					</Link>
				</li>
				<li>
					<Link href="/profile">
						<a>Profile</a>
					</Link>
				</li>
				<li>
					<Link href="/faqs">
						<a>FAQs</a>
					</Link>
				</li>
				<li>
					<Link href="/contact">
						<a>Contact</a>
					</Link>
				</li>
				{handleUserSignIn ? (
					<Link href={'/profile'}>
						<a className="navprofileimage">
							<span>
								<Image
									src="/images/profile.png"
									alt="logo"
									width={48}
									height={45}
								/>
							</span>
						</a>
					</Link>
				) : (
					<Link href={'/signin'}>
						<a className="signinbutton">
							<button>Log in</button>
						</a>
					</Link>
				)}
				{handleUserSignIn ? (
					<Link href="/signin">
						<a className="signout" onClick={handleSignout}>
							<i className="fas fa-right-from-bracket"></i>
							<p>Log out</p>
						</a>
					</Link>
				) : (
					<div className="signup">
						<p className="or">or</p>
						<Link href={'/signup'}>
							<a>
								<button>Create An Account</button>
							</a>
						</Link>
					</div>
				)}
			</ul>
			<div className="navbg" onClick={handleHamburgerClose}></div>
		</nav>
	);
};

export default Navbar;
