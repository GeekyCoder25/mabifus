import styles from '../src/styles/Signup.module.css';
import Link from 'next/link';
import Meta from '../src/components/Meta';
import { useState } from 'react';
import { useRouter } from 'next/router';
const Signup = ({ sethandleUserSignIn, setFirstname, setLastname }) => {
	const { push } = useRouter();
	const [loading, setloading] = useState('Create account');
	const [emailvalid, setEmailvalid] = useState(null);
	const [passwordValid, setPasswordValid] = useState('');
	const [confirmPasswordValid, setconfirmPasswordValid] = useState(false);
	const [passwordIcon, setpasswordIcon] = useState(
		<i className="fas fa-key"></i>
	);
	const [confirmpasswordIcon, setconfirmpasswordIcon] = useState(
		<i className="fas fa-key"></i>
	);
	const handlePassowrdIcon = e => {
		e.target.value !== ''
			? setpasswordIcon(<i className="fas fa-eye"></i>)
			: setpasswordIcon(<i className="fas fa-key"></i>);
	};
	const handleConfirmPassowrdIcon = e => {
		e.target.value !== ''
			? setconfirmpasswordIcon(<i className="fas fa-eye"></i>)
			: setconfirmpasswordIcon(<i className="fas fa-key"></i>);
	};
	const showPassword = () => {
		const target = document.querySelector('#password');
		target.type === 'password' ? (target.type = 'text') : null;
	};
	const removePassword = () => {
		const target = document.querySelector('#password');
		target.type === 'text' ? (target.type = 'password') : null;
	};
	const showConfirmPassword = () => {
		const target = document.querySelector('#confirmpassword');
		target.type === 'password' ? (target.type = 'text') : null;
	};
	const removeConfirmPassword = () => {
		const target = document.querySelector('#confirmpassword');
		target.type === 'text' ? (target.type = 'password') : null;
	};
	const handleInputChange = () => {
		const inputs = document.querySelectorAll('input');
		const oppinputsfilter = [...inputs].filter(input => input.value !== '');
		oppinputsfilter.forEach(input => input.classList.remove(styles.error));
		oppinputsfilter.length === 5 && setconfirmPasswordValid(null);
	};
	const hanndleAllInputs = () => {
		const inputs = document.querySelectorAll('input');
		const email = document.querySelector('#email');
		const password = document.querySelector('#password');
		const oppinputsfilter = [...inputs].filter(input => input.value !== '');
		setconfirmPasswordValid(
			<>
				<i
					className={`
					${'fa-solid fa-circle-exclamation'}
					${styles['fa-circle-exclamation']}
					`}
				></i>
				<span>Please input all fields</span>
			</>
		);
		oppinputsfilter.forEach(input => input.classList.remove(styles.error));
		inputs.forEach(input =>
			input.addEventListener('change', handleInputChange)
		);
		email.addEventListener('change', () => setEmailvalid(null));
		password.addEventListener('change', () => setPasswordValid(null));
	};
	const handleSubmit = e => {
		e.preventDefault();
		const inputs = document.querySelectorAll('input');
		const email = document.querySelector('#email');
		const password = document.querySelector('#password');
		const confirmPassword = document.querySelector('#confirmpassword');
		const inputsfilter = [...inputs].filter(input => input.value === '');
		const acceptterms = document.querySelector('#acceptterms');
		inputsfilter.forEach(input => {
			input.classList.add(styles.error);
		});
		inputs.forEach(input => {
			hanndleAllInputs(input);
			setEmailvalid(null);
			setPasswordValid(null);
		});
		setloading('Create account');
		if (
			inputsfilter <= 0 &&
			(email.value.length < 6 ||
				!email.value.includes('@') ||
				!email.value.includes('.'))
		) {
			setEmailvalid(
				<>
					<i
						className={`${'fa-solid fa-circle-exclamation'}	
							${styles['fa-circle-exclamation']}`}
					></i>
					<span> Please input a valid email</span>
				</>
			);
			email.classList.add(styles.error);
		} else if (inputsfilter <= 0 && password.value.length < 8) {
			setPasswordValid(
				<>
					<i
						className={`
							${'fa-solid fa-circle-exclamation'}
							${styles['fa-circle-exclamation']}
							`}
					></i>
					<span>Password must be at least 8 characters long</span>
				</>
			);
			password.classList.add(styles.error);
		} else if (inputsfilter <= 0 && password.value !== confirmPassword.value) {
			setconfirmPasswordValid(
				<>
					<i
						className={`
							${'fa-solid fa-circle-exclamation'}
							${styles['fa-circle-exclamation']}
							`}
					></i>
					<span>Password doesn&apos;t match</span>
				</>
			);
			password.classList.add(styles.error);
			confirmPassword.classList.add(styles.error);
		} else if (inputsfilter <= 0 && !acceptterms.checked) {
			const accepttermscontainer =
				document.querySelector('#acceptterms').parentNode;
			console.log(acceptterms.checked);
			accepttermscontainer.classList.add(styles.accepttermserror);
			setTimeout(
				() => accepttermscontainer.classList.remove(styles.accepttermserror),
				500
			);
			setconfirmPasswordValid(null);
		} else if (inputsfilter <= 0) {
			setconfirmPasswordValid(null);
			setPasswordValid(null);
			setFirstname(document.querySelector('#firstname').value);
			setLastname(document.querySelector('#lastname').value);
			console.log('Creating your Account');
			setloading(
				<>
					Creating your account
					<span className="dotTyping"></span>
				</>
			);
			setTimeout(() => {
				setconfirmPasswordValid(
					<span className={styles.formSuccess}>
						<i
							className={`
								${'fa-solid fa-circle-check'}
								${styles['fa-circle-exclamation']}
								`}
						></i>
						<span>Your Account has been created</span>
					</span>
				);
				setloading(
					<>
						Signing in
						<span className="dotTyping"></span>
					</>
				);
			}, 3000);
			setTimeout(() => {
				sethandleUserSignIn(true);
				push('/');
			}, 5000);
		}
	};

	return (
		<>
			<Meta title="Create an Account" />
			<section className={styles.signupstyles}>
				<nav className={styles.nav}>
					<h1>Mabifus </h1>
					<Link href="/">
						<a>Home</a>
					</Link>
					<Link href="/signin">
						<a>Login</a>
					</Link>
				</nav>
				<main className={styles.main}>
					<header className={styles.header}>
						<p>Open for Free</p>
						<h1>
							Create new account<span>.</span>
						</h1>
						<p>
							Already A Member?{' '}
							<Link href="/signin">
								<a>Login</a>
							</Link>
						</p>
					</header>
					<form action="" className={styles.form}>
						<div>
							<input
								type="text"
								name="firstname"
								id="firstname"
								placeholder="First name"
							/>
							<i className="fas fa-address-card"></i>
						</div>
						<div>
							<input
								type="text"
								name="lastname"
								id="lastname"
								placeholder="Last name"
							/>
							<i className="fas fa-address-card"></i>
						</div>
						<div className={styles.email}>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Email"
								required
							/>
							<i className="fas fa-envelope"></i>
							{<p className={styles.formvalid}>{emailvalid}</p>}
						</div>
						<div className={styles.password}>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Password"
								onChange={handlePassowrdIcon}
							/>
							<span
								onMouseUp={removePassword}
								onMouseLeave={removePassword}
								onMouseDown={showPassword}
								onTouchStart={showPassword}
								onTouchEnd={removePassword}
							>
								{passwordIcon}
							</span>
							{<p className={styles.formvalid}>{passwordValid}</p>}
						</div>
						<div className={styles.password}>
							<input
								type="password"
								name="confirmpassword"
								id="confirmpassword"
								placeholder="Confirm Password"
								onChange={handleConfirmPassowrdIcon}
							/>
							<span
								onMouseUp={removeConfirmPassword}
								onMouseLeave={removeConfirmPassword}
								onMouseDown={showConfirmPassword}
								onTouchStart={showConfirmPassword}
								onTouchEnd={removeConfirmPassword}
							>
								{confirmpasswordIcon}
							</span>
							<span className={styles.confirmpasswordvalid}>
								{confirmPasswordValid}
							</span>
						</div>
						<div className={styles.acceptterms}>
							<input type="checkbox" name="acceptterms" id="acceptterms" />
							<label htmlFor="acceptterms">
								I&apos;ve read and accepts the{' '}
								<Link href="">
									<a>Terms & conditons</a>
								</Link>
							</label>
						</div>
						<button type="submit" className={styles.methodsubmit}>
							<Link href="/method">
								<a>Change method</a>
							</Link>
						</button>
						<button
							type="submit"
							className="signinsubmit"
							onClick={handleSubmit}
						>
							{loading}
						</button>
					</form>
				</main>
				<footer className={styles.footer}>
					<h1>MABIFUS</h1>
				</footer>
			</section>
		</>
	);
};

export default Signup;
