import Image from 'next/image';
import Link from 'next/link';
// import styles from '../styles/Navbar.module.css';

const Navbar = () => {
	const handleUserSignIn = false;

	return (
		<nav className="nav">
			<div className="bars">
				<i className="fas fa-bars fa-2x"></i>
			</div>
			<div className="navheader">
				<div className="navheaderprofile">
					{/* <Image src="/images/profile.png" alt="logo" width={72} height={72} /> */}
					<h1 className="navheadertext">MABIFUS</h1>
				</div>
			</div>
			<ul>
				<li>
					<Link href="/home">Home</Link>
				</li>
				<li>
					<Link href="/products">Products</Link>
				</li>
				<li>
					<Link href="/pricing">Pricing</Link>
				</li>
				<li>
					<Link href="/feature">Feature</Link>
				</li>
				<li>
					<Link href="/faqs">FAQs</Link>
				</li>
				<li>
					<Link href="/contact">Contact</Link>
				</li>
				{handleUserSignIn ? (
					<span className="navprofileimage">
						<Image
							src="/images/profile.png"
							alt="logo"
							width={62}
							height={62}
						/>
					</span>
				) : (
					<button>Sign In</button>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
