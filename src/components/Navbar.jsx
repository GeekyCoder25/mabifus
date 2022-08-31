import Link from 'next/link';
import Image from 'next/image';

const Navbar = ({ handleUserSignIn }) => {
	const handleHamburger = () => {
		const navbar = document.querySelector('.nav ul');
		const navpage = document.querySelectorAll('.nav ul li');
		const bg = document.querySelector('.navbg');
		const bars = document.querySelector('nav .fa-bars');
		const xmark = document.querySelector('nav .fa-xmark');
		const signup = document.querySelector('.signup');
		const userLogo = document.querySelector('.navprofileimage');
		navbar.classList.add('navpagemobile');
		navbar.classList.add('navpagemobileleft');
		navpage.forEach(i => i.classList.add('navpagemobilelinks'));
		bg.classList.add('blurbg');
		bars.style.display = 'none';
		xmark.style.display = 'block';
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
		setTimeout(() => {
			navbar.classList.remove('navpagemobile');
		}, 200);
		navbar.classList.remove('navpagemobileleft');
		navpage.forEach(i => i.classList.remove('navpagemobilelinks'));
		bg.classList.remove('blurbg');
		bars.style.display = 'block';
		xmark.style.display = 'none';
		!handleUserSignIn
			? (signup.style.display = 'none')
			: (userLogo.style.display = 'block');
	};
	const removecancelblur = () => {
		handleHamburgerClose();
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
					<Link href="/feature">
						<a>Feature</a>
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
						<a>
							<button>Sign In</button>
						</a>
					</Link>
				)}
				{handleUserSignIn || (
					<div className="signup">
						<p className="or">or</p>
						<Link href={'/signin'}>
							<a>
								<button>Create An Account</button>
							</a>
						</Link>
					</div>
				)}
			</ul>
			<div className="navbg" onClick={removecancelblur}></div>
		</nav>
	);
};

export default Navbar;
