import Image from 'next/image';
import Meta from '../src/components/Meta';
import styles from '../src/styles/Profile.module.css';
import userlogo from '../public/images/profile.png';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Profile = () => {
	const [handleUserSignIn, sethandleUserSignIn] = useState(false);
	const [userData, setuserData] = useState('');
	const [profileImageState, setProfileImageState] = useState(userlogo);
	const basicDetail = useRef();
	const maleInputRef = useRef();
	const femaleInputRef = useRef();
	const userPic = useRef();
	const { push } = useRouter();
	// const [picture, setpicture] = useState();
	const [loading, setloading] = useState('Save Profile');
	const [noUserExists, setNoUserExists] = useState(true);

	useEffect(() => {
		const emailLocalStorageCheck = localStorage.getItem('mabifusUserToken');
		emailLocalStorageCheck
			? sethandleUserSignIn(true)
			: sethandleUserSignIn(false);
		handleUserSignIn &&
			fetch(
				`https://panicky-fly-pea-coat.cyclic.app/api/user/${localStorage.getItem(
					'mabifusUserToken'
				)}`
			)
				.then(res => res.json())
				.then(data => setuserData(data))
				.catch(err => setuserData(err.message));
	}, [handleUserSignIn]);
	const handlePicture = e => {
		const handlePictureChange = new FileReader();
		handlePictureChange.readAsDataURL(e.target.files[0]);
		handlePictureChange.onload = e => {
			setProfileImageState(e.target.result);
		};
	};
	const editProfile = e => {
		e.preventDefault();
		const paragraphs = document.querySelectorAll('p');
		const input = document.querySelectorAll('input');
		const datecontainericon = document.querySelector('.fas.fa-chevron-down');
		const saveProfileButton = document.querySelector('button[type=submit]');
		const cancelProfileButton = document.querySelector('#cancel');
		const firstnameInput = document.querySelector('#firstname');
		const lastnameInput = document.querySelector('#lastname');
		const genderInput = document.querySelectorAll('input');

		basicDetail.current.scrollIntoView({ behavior: 'smooth' });
		paragraphs.forEach(paragraph => paragraph.classList.add(styles.editinput));
		input.forEach(input => {
			input.previousSibling?.textContent === 'Not Set'
				? (input.value = '')
				: (input.value = input.previousSibling?.textContent);
			input.classList.add(styles.showeditinput);
		});
		saveProfileButton.classList.add(styles.showeditinput);
		cancelProfileButton.classList.add(styles.showeditinput);
		datecontainericon.classList.add(styles.editinput);
		genderInput.forEach(input => {
			input.getAttribute('name') === 'gender' &&
				input.removeAttribute('disabled');
		});
		firstnameInput.value = userData.firstname;
		lastnameInput.value = userData.lastname;
	};
	const canceleditProfile = () => {
		const paragraphs = document.querySelectorAll('p');
		const input = document.querySelectorAll('input');
		const datecontaonericon = document.querySelector('.fas.fa-chevron-down');
		const saveProfileButton = document.querySelector('button[type=submit]');
		const cancelProfileButton = document.querySelector('#cancel');
		const genderInput = document.querySelectorAll('input');

		window.scrollTo(0, 0);
		paragraphs.forEach(paragraph =>
			paragraph.classList.remove(styles.editinput)
		);
		input.forEach(input => {
			input.value = input.previousSibling?.textContent;
			input.classList.remove(styles.showeditinput);
		});
		saveProfileButton.classList.remove(styles.showeditinput);
		cancelProfileButton.classList.remove(styles.showeditinput);
		datecontaonericon.classList.remove(styles.editinput);
		genderInput.forEach(input => {
			if (input.getAttribute('name') === 'gender' && !input.checked) {
				return input.setAttribute('disabled', 'disabled');
			}
		});
		setloading(loading);
	};
	const saveProfile = e => {
		setloading(
			<>
				Updating Profile
				<span className="dotTyping"></span>
			</>
		);
		e.preventDefault();
		const firstname = document.querySelector('#firstname').value;
		const lastname = document.querySelector('#lastname').value;
		const height = document.querySelector('#height').value;
		const weight = document.querySelector('#weight').value;
		const dob = document.querySelector('#dob').value;
		const bloodgroup = document.querySelector('#bloodgroup').value;
		const bloodtype = document.querySelector('#bloodtype').value;
		const phonenumber = document.querySelector('#phonenumber').value;
		const maleInputref = maleInputRef.current;
		const femaleInputref = femaleInputRef.current;
		const genderChecker = () => {
			if (maleInputref.checked) {
				return maleInputref.value;
			} else if (femaleInputref.checked) {
				return femaleInputref.value;
			}
		};
		const gender = genderChecker();
		// const testFormData = new FormData();
		// testFormData.append('.wejkdhej', 'ekjdferjfirf');
		const userInputdata = {
			firstname,
			lastname,
			dob,
			gender,
			phonenumber,
			bloodgroup,
			bloodtype,
			weight,
			height,
		};
		fetch(
			`https://panicky-fly-pea-coat.cyclic.app/api/user/${localStorage.getItem(
				'mabifusUserToken'
			)}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(userInputdata),
			}
		)
			.then(() => {
				setTimeout(() => {
					setuserData(userInputdata), canceleditProfile();
				}, 500);
			})
			.catch(err => console.log(err));
	};
	useEffect(() => {
		!handleUserSignIn &&
			setTimeout(() => {
				setNoUserExists(false);
			}, 3000);
	}, [handleUserSignIn, push]);
	return !userData ? (
		<div className="pageLoading">
			{noUserExists ? (
				<div>
					Loading
					<span className="dotTypingPageLoading"></span>
				</div>
			) : (
				<>
					<button href="/signin" onClick={() => push('/signin')}>
						Log in
					</button>{' '}
					<p>You must login to view your profile</p>
				</>
			)}
		</div>
	) : (
		<article className={styles.profilestyles}>
			<Meta
				title="User Profile"
				description={'Mabifus user profile page'}
				keywords={
					'mabifus, mabifus profile, mabifus user, mabifus user profile page'
				}
			/>

			<main>
				<header className={styles.header}>
					<section>
						<h2>My Profile</h2>
						<Link href="/editprofile">
							<a onClick={editProfile}>
								<h1>Edit Profile</h1>
							</a>
						</Link>
					</section>
					<div className={styles.profileimage}>
						<Image
							src={profileImageState}
							alt="userlogo"
							placeholder="blur"
							blurDataURL="/images/placeholder.gif"
							width={240}
							height={240}
						/>
						<label htmlFor="chooseimage" ref={basicDetail}>
							<i className={`${'fas fa-camera'} ${styles['fa-camera']}`}></i>
						</label>
						<input
							type="file"
							name="chooseimage"
							id="chooseimage"
							onChange={handlePicture}
							ref={userPic}
						/>
					</div>
				</header>
				<form className={styles.main}>
					<section>
						<h2>Basic Detail</h2>
						<label>Full name</label>
						<div className={styles.nameinputContainer} id="nameinputContainer">
							<p className={styles.textborder}>
								{userData.firstname} {userData.lastname}
							</p>
							<input
								type="text"
								name="firstname"
								id="firstname"
								className={styles.editinput}
							/>
							<input
								type="text"
								name="lastname"
								id="lastname"
								className={styles.editinput}
							/>
						</div>
						<div className={styles.datecontainer}>
							<label>Date of Birth</label>
							<p className={styles.textborder}>{userData.dob || 'Not Set'}</p>
							<input type="date" className={styles.editinput} id="dob" />
							<i className="fas fa-chevron-down" onClick={editProfile}></i>
						</div>
						<label>Gender</label>
						<div className={styles.gendercontainer}>
							<p className={styles.textborder}>
								<label htmlFor="male">male</label>
								<input
									type="radio"
									name="gender"
									id="male"
									ref={maleInputRef}
									defaultChecked={userData.gender === 'male' ? true : false}
									disabled={userData.gender === 'male' ? false : true}
								/>
							</p>
							<p className={styles.textborder}>
								<label htmlFor="female">female</label>
								<input
									type="radio"
									name="gender"
									id="female"
									ref={femaleInputRef}
									defaultChecked={userData.gender === 'female' ? true : false}
									disabled={userData.gender === 'female' ? false : true}
								/>
							</p>
						</div>
					</section>
					<section>
						<h2>Contact Detail</h2>
						<label>Mobile number</label>
						<p className={styles.textborder}>
							{userData.phonenumber || 'Not Set'}
						</p>
						<input
							type="tel"
							name="number "
							id="phonenumber"
							className={styles.editinput}
						/>
						<label>Email</label>
						<p className={styles.textborder}>{userData.email || 'Not Set'}</p>
						<input
							type="email"
							name="email"
							id="email"
							className={styles.editinput}
						/>
					</section>
					<section>
						<h2>Personal Detail</h2>
						<label>Blood Group</label>
						<p className={styles.textborder}>
							{userData.bloodgroup || 'Not Set'}
						</p>
						<input type="text" className={styles.editinput} id="bloodgroup" />
						<label>Blood Type</label>
						<p className={styles.textborder}>
							{userData.bloodtype || 'Not Set'}
						</p>
						<input type="text" className={styles.editinput} id="bloodtype" />
						<label>Weight (kg)</label>
						<p className={styles.textborder}>{userData.weight || 'Not Set'}</p>
						<input
							type="number"
							name="weight"
							id="weight"
							className={styles.editinput}
						/>
						<label>Height (cm)</label>
						<p className={styles.textborder}>{userData.height || 'Not Set'}</p>
						<input
							type="number"
							name="height"
							id="height"
							className={styles.editinput}
						/>
					</section>
					<div className={styles.submitbuttoncontainer}>
						<button type="submit" onClick={saveProfile}>
							{loading}
						</button>
						<button type="reset" id="cancel" onClick={canceleditProfile}>
							Cancel
						</button>
					</div>
				</form>
			</main>
		</article>
	);
};

export default Profile;
