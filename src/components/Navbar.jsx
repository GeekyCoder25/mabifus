import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = ({ handleMode }) => {
	const [handleUserSignIn, sethandleUserSignIn] = useState(false);
	const [userExists, setuserExists] = useState(true);
	const { pathname } = useRouter();
	const [activelinkarrow] = useState(<i className="fas fa-angles-right"></i>);
	const colorSchemeRef = useRef();
	useEffect(() => {
		const user = localStorage.getItem('mabifusUserToken');
		user ? sethandleUserSignIn(true) : sethandleUserSignIn(false);
		setTimeout(() => {
			setuserExists(false);
		}, 2000);
	}, []);
	const handleHamburger = () => {
		const navbar = document.querySelector('.nav ul');
		const navpage = document.querySelectorAll('.nav ul li');
		const navbuttons = document.querySelectorAll('.nav button');
		const bg = document.querySelector('.navbg');
		const barsActive = document.querySelector('nav .bars');
		const bars = document.querySelector('nav .fa-bars');
		const xmark = document.querySelector('nav .fa-xmark');
		const signup = document.querySelector('.signup');
		const userLogo = document.querySelector('.navprofileimage');
		const signout = document.querySelector('.signout');
		document.querySelector('.nav').classList.remove('navblur');
		navbar.classList.add('navpagemobile');
		navbar.classList.add('navpagemobileleft');
		navpage.forEach(navlink => {
			navlink.addEventListener('click', () => handleHamburgerClose());
			navlink.classList.add('navpagemobilelinks');
		});
		navbuttons.forEach(navbutton => {
			navbutton.classList.add('button');
		});
		bg.classList.add('blurbg');
		barsActive.classList.add('barsActive');
		bars.style.display = 'none';
		xmark.style.display = 'block';
		handleUserSignIn && signout.classList.add('signoutactive');
		document.body.classList.add('navbodymobile');
		!handleUserSignIn
			? (signup.style.display = 'flex')
			: (userLogo.style.display = 'none');
		setTimeout(() => {
			colorSchemeRef.current.classList.add('colorSchemeMobile');
		}, 380);
	};
	const handleHamburgerClose = () => {
		const navbar = document.querySelector('.nav ul');
		const navpage = document.querySelectorAll('.nav ul li');
		const navbuttons = document.querySelectorAll('.nav button');
		const bg = document.querySelector('.navbg');
		const barsActive = document.querySelector('nav .bars');
		const bars = document.querySelector('nav .fa-bars');
		const xmark = document.querySelector('nav .fa-xmark');
		const signup = document.querySelector('.signup');
		const userLogo = document.querySelector('.navprofileimage');
		const signout = document.querySelector('.signout');
		setTimeout(() => {
			navbar.classList.remove('navpagemobile');
		}, 200);
		document.querySelector('.nav').classList.add('navblur');
		navbar.classList.remove('navpagemobileleft');
		navpage.forEach(navlink => navlink.classList.remove('navpagemobilelinks'));
		navbuttons.forEach(navbutton => {
			navbutton.classList.remove('button');
		});
		bg.classList.remove('blurbg');
		barsActive.classList.remove('barsActive');
		bars.style.display = 'block';
		xmark.style.display = 'none';
		handleUserSignIn && signout.classList.remove('signoutactive');
		document.body.classList.remove('navbodymobile');
		!handleUserSignIn
			? (signup.style.display = 'none')
			: setTimeout(() => (userLogo.style.display = 'block'), 200);
		colorSchemeRef.current.classList.remove('colorSchemeMobile');
	};

	const handleSignout = () => {
		handleHamburgerClose();
		localStorage.clear('mabifusUserToken');
	};
	useEffect(() => {
		const navlinkpaths = document.querySelectorAll('ul li a');
		navlinkpaths.forEach(navlink => {
			if (pathname === navlink.getAttribute('href')) {
				navlink.classList.add('navactive');
				navlink.firstChild.classList.add('navactive');
			} else {
				navlink.classList.remove('navactive');
				navlink.firstChild.classList.remove('navactive');
			}
		});
	}, [pathname]);
	return (
		<nav className="nav navblur">
			<div className="bars">
				<i className="fas fa-bars" onClick={handleHamburger}></i>
				<i className="fas fa-xmark" onClick={handleHamburgerClose}></i>
				<div
					className="colorSchemeMobileHide"
					ref={colorSchemeRef}
					onClick={() => handleHamburgerClose()}
				>
					<i className="fas fa-toggle-on" onClick={handleMode}></i>
				</div>
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
						<a>{activelinkarrow}Home</a>
					</Link>
				</li>
				<li>
					<Link href="/find-a-doctor">
						<a>{activelinkarrow}Find a doctor</a>
					</Link>
				</li>
				<li>
					<Link href="/conditions&treatments">
						<a>{activelinkarrow}Conditons & Treatments</a>
					</Link>
				</li>
				<li>
					<Link href="/profile">
						<a>{activelinkarrow}User Profile</a>
					</Link>
				</li>
				{/* <li>
					<Link href="/faqs">
						<a>{activelinkarrow}FAQs</a>
					</Link>
				</li> */}
				<li>
					<Link href="/contact">
						<a>{activelinkarrow}Contact</a>
					</Link>
				</li>
				{handleUserSignIn ? (
					<Link href={'/profile'}>
						<a className="navprofileimage">
							<span>
								<Image
									src="/images/profile.png"
									alt="logo"
									width={32}
									height={30}
								/>
							</span>
						</a>
					</Link>
				) : (
					<>
						{userExists ? (
							<span></span>
						) : (
							<Link href={'/signin'}>
								<a className="signinbutton">
									<button>Log in</button>
								</a>
							</Link>
						)}
					</>
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
