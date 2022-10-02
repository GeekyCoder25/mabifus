import Link from 'next/link';
import Image from 'next/image';
import doctor from '../../public/images/doctor.png';

const Header = ({ username }) => {
	return (
		<header className="home-header">
			<h1>Dashboard</h1>
			<section>
				<div className="welcome">
					<div>
						<h4>Welcome {username}</h4>
						<p>
							Let&apos;s check your health with us. Care with your health from
							now to get more live better.
						</p>
						<Link href="find-a-doctor">
							<a>Connect to doctor</a>
						</Link>
						<div className="greenheader">
							<Image
								src="/images/greenheader.png"
								alt=""
								width={50}
								height={120}
							/>
						</div>
					</div>
					<div className="headerdoctor">
						<Image
							src={doctor}
							alt="doctor logo"
							placeholder="blur"
							width={400}
							height={400}
						/>
					</div>
				</div>
				<aside>
					<h2>Profile</h2>
					<div>
						<Link href="/profile">
							<a>
								<Image
									src="/images/profile.png"
									alt="profile"
									width={100}
									height={100}
								/>
								<h4>{username && username}</h4>
								<p>Heart Patient</p>
							</a>
						</Link>
					</div>
				</aside>
			</section>
		</header>
	);
};

export default Header;
