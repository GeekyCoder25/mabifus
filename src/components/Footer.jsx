import Link from 'next/link';
const Footer = () => {
	return (
		<article className='footer'>
			<section>
				<div>
					<h1>Menu</h1>
					<p>
						<Link href='/'>
							<a>About Mabifus</a>
						</Link>
					</p>
					<p>
						<Link href='/'>
							<a>Advertisements</a>
						</Link>
					</p>
					<p>
						<Link href='/'>
							<a>Doctors</a>
						</Link>
					</p>
					<p>
						<Link href='/'>
							<a>Support</a>
						</Link>
					</p>
				</div>
				<div>
					<h1>Sections</h1>
					<p>
						<Link href='/'>
							<a>Emergency and Surgery</a>
						</Link>
					</p>
					<p>
						<Link href='/'>
							<a>Fitness</a>
						</Link>
					</p>
					<p>
						<Link href='/'>
							<a>Pharmacy</a>
						</Link>
					</p>
					<p>
						<Link href='/'>
							<a>Sick bay</a>
						</Link>
					</p>
				</div>
				<div>
					<h1>Contact US</h1>
					<p>
						<Link href='/'>
							<a>+2349073002599</a>
						</Link>
					</p>
					<p>
						<Link href='/'>
							<a>Contact@Mabifus.com</a>
						</Link>
					</p>
					<p onClick={()=> localStorage.clear()}>
						<Link href='/signin'>
							<a>Logout</a>
						</Link>
					</p>
				</div>
				<div className='footer-icons'>
					<h1>Socials</h1>
					<Link href='/'>
						<a>
							<i className='fab fa-facebook'></i>
						</a>
					</Link>
					<Link href='/'>
						<a>
							<i className='fab fa-twitter'></i>
						</a>
					</Link>
					<Link href='/'>
						<a>
							<i className='fab fa-linkedin'></i>
						</a>
					</Link>
					<Link href='/'>
						<a>
							<i className='fab fa-github'></i>
						</a>
					</Link>
				</div>
			</section>
			<hr />
			<div className='footer-base'>
				<h1>Mabifus</h1>
				<p>&copy; Geeky Coder, 2022 All rights Reserved</p>
			</div>
		</article>
	);
};

export default Footer;
