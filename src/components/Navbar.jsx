import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
	const handleUserSignIn = false;
	const handleHamburger = () => {
		const navbar = document.querySelector('.nav ul');
		const navpage = document.querySelectorAll('.nav ul li');
		const bg = document.querySelector('.navbg');
		const bars = document.querySelector('nav .fa-bars');
		const xmark = document.querySelector('nav .fa-xmark');
		const signup = document.querySelector('.signup');
		navbar.classList.add('navpagemobile');
		navbar.classList.add('navpagemobileleft');
		navpage.forEach(i => i.classList.add('navpagemobilelinks'));
		bg.classList.add('blurbg');
		bars.style.display = 'none';
		xmark.style.display = 'block';
		signup.style.display = 'flex';
	};
	const handleHamburgerClose = () => {
		const navbar = document.querySelector('.nav ul');
		const navpage = document.querySelectorAll('.nav ul li');
		const bg = document.querySelector('.navbg');
		const bars = document.querySelector('nav .fa-bars');
		const xmark = document.querySelector('nav .fa-xmark');
		const signup = document.querySelector('.signup');
		setTimeout(() => {
			navbar.classList.remove('navpagemobile');
		}, 200);
		navbar.classList.remove('navpagemobileleft');
		navpage.forEach(i => i.classList.remove('navpagemobilelinks'));
		bg.classList.remove('blurbg');
		bars.style.display = 'block';
		xmark.style.display = 'none';
		signup.style.display = 'none';
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
					<Link href="/home">
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
					<span className="navprofileimage">
						<Image src="/logo" alt="logo" width={78} height={78} />
					</span>
				) : (
					<Link href={'/'}>
						<a>
							<button>Sign In</button>
						</a>
					</Link>
				)}
				<div className="signup">
					<p className="or">or</p>
					<button>Create An Account</button>
				</div>
			</ul>
			<div className="navbg" onClick={removecancelblur}></div>
		</nav>
	);
};

export default Navbar;
