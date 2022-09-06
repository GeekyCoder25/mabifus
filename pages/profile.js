import Image from 'next/image';
import Meta from '../src/components/Meta';
import styles from '../src/styles/Profile.module.css';
import userlogo from '../public/images/profile.png';
import { useEffect, useState } from 'react';

const Profile = () => {
	const [username, setusername] = useState('');
	const [email, setemail] = useState('');
	const [profileImage, setprofileImage] = useState(userlogo);
	useEffect(() => {
		setusername(localStorage.getItem('username'));
		setemail(localStorage.getItem('email'))
	}, [username]);
	const handlePicture = () => {
		const imageInput = document.querySelector('#chooseimage');
		console.log(imageInput);
		setprofileImage(imageInput.value);
	};
	return (
		<>
			<Meta title={'User Profile'} description={'Mabifus user profile page'} />
			<header>
				<h1 className={styles.header}>My Profile</h1>
				<div className={styles.profileimage}>
					<Image
						src={profileImage}
						alt="userlogo"
						placeholder="blur"
						width={200}
						height={200}
					/>
					<label htmlFor="chooseimage">
						<i
							className={`${'fas fa-camera'}
                    ${styles['fas']}`}
							onClick={handlePicture}
						></i>
					</label>
					<input type="file" name="chooseimage" id="chooseimage" />
				</div>
			</header>
			<main className={styles.main}>
				<section>
					<h2>Basic Detail</h2>
					<p>Full name</p>
					<p className={styles.textborder}>{username}</p>
					<div className={styles.datecontainer}>
						<p>Date of Birth</p>
						<p className={styles.textborder}>11 November 2001</p>
						<i className="fas fa-chevron-down"></i>
						{/* <input type="date" name="date" id="date" className={styles.date}value="2001-11-25" /> */}
					</div>
					<p>Gender</p>
					<div className={styles.gendercontainer}>
						<p className={styles.textborder}>
							<input type="radio" name="gender" id="male" defaultChecked />
							<label htmlFor="male">Male</label>
						</p>
						<p className={styles.textborder}>
							<input type="radio" name="gender" id="female" />
							<label htmlFor="female">Female</label>
						</p>
					</div>
				</section>
				<section>
					<h2>Contact Detail</h2>
					<p>Mobile number</p>
					<p className={styles.textborder}>+2349073002599</p>
					<p>Email</p>
					<p className={styles.textborder}>{email}</p>
				</section>
				<section>
					<h2>Personal Detail</h2>
					<p>Blood Group</p>
					<p className={styles.textborder}>0 +</p>
					<p>Blood Type</p>
					<p className={styles.textborder}>AA</p>
					<p>Weight (kg)</p>
					<p className={styles.textborder}>64</p>
					<p>Height (cm)</p>
					<p className={styles.textborder}>135.5</p>
				</section>
			</main>
		</>
	);
};

export default Profile;
