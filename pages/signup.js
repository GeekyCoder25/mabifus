import styles from '../src/styles/Signup.module.css';
import Link from 'next/link';
import Meta from '../src/components/Meta';
import { useState } from 'react';
import { useRouter } from 'next/router';
const Signup = () => {
	const { push } = useRouter();
	const [loading, setloading] = useState('Create account');
	const [emailvalid, setEmailvalid] = useState(null);
	const [passwordValid, setPasswordValid] = useState(null);
	const [confirmPasswordValid, setconfirmPasswordValid] = useState(null);
	const [passwordIcon, setpasswordIcon] = useState(
		<i className="fas fa-key"></i>
	);
	const [confirmpasswordIcon, setconfirmpasswordIcon] = useState(
		<i className="fas fa-key"></i>
	);
	const [exclamationIcon] = useState(
		<i
			className={`${'fas fa-circle-exclamation'} ${
				styles['fa-circle-exclamation']
			}`}
		></i>
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
		target.type === 'password'
			? (target.type = 'text')
			: (target.type = 'password');
	};
	const showConfirmPassword = () => {
		const target = document.querySelector('#confirmpassword');
		target.type === 'password'
			? (target.type = 'text')
			: (target.type = 'password');
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
		const emailInput = document.querySelector('#email');
		const passwordInput = document.querySelector('#password');
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
		const getData = async () => {
			const res = await fetch('/api/users');
			const data = await res.json();
			return data;
		};
		getData().then(data => {
			const getUser = data.find(user => user.id === emailInput.value);
			if (inputsfilter.length !== 0)
				setconfirmPasswordValid(
					<>
						{exclamationIcon}
						<span>Please input alsl fields</span>
					</>
				);
			else if (
				inputsfilter <= 0 &&
				(emailInput.value.length < 6 ||
					!emailInput.value.includes('@') ||
					!emailInput.value.includes('.'))
			) {
				setEmailvalid(
					<>
						{exclamationIcon}
						<span> Please input a valid email</span>
					</>
				);
				emailInput.classList.add(styles.error);
			} else if (inputsfilter <= 0 && getUser?.email !== undefined) {
				setconfirmPasswordValid(
					<>
						{exclamationIcon}
						Account already exists.{' '}
						<Link href={'/signin'}>
							<a className={styles.formvalidlink}>Login</a>
						</Link>
					</>
				);
				emailInput.classList.add(styles.error);
			} else if (inputsfilter <= 0 && passwordInput.value.length < 8) {
				setPasswordValid(
					<>
						{exclamationIcon}
						<span>Password must be at least 8 characters long</span>
					</>
				);
				passwordInput.classList.add(styles.error);
			} else if (
				inputsfilter <= 0 &&
				passwordInput.value !== confirmPassword.value
			) {
				setconfirmPasswordValid(
					<>
						{exclamationIcon}
						<span>Password doesn&apos;t match</span>
					</>
				);
				passwordInput.classList.add(styles.error);
				confirmPassword.classList.add(styles.error);
			} else if (inputsfilter <= 0 && !acceptterms.checked) {
				const accepttermscontainer =
					document.querySelector('#acceptterms').parentNode;
				accepttermscontainer.classList.add(styles.accepttermserror);
				setTimeout(
					() => accepttermscontainer.classList.remove(styles.accepttermserror),
					500
				);
				setconfirmPasswordValid(null);
			} else if (inputsfilter <= 0) {
				setconfirmPasswordValid(null);
				setPasswordValid(null);
				console.log('Creating your Account');
				setloading(
					<>
						Creating your account
						<span className="dotTyping"></span>
					</>
				);

				const firstname = document.querySelector('#firstname').value;
				const lastname = document.querySelector('#lastname').value;
				const email = document.querySelector('#email').value;
				const password = document.querySelector('#password').value;

				const userInputdata = {
					firstname,
					lastname,
					email,
					password,
				};
				const postData = async () => {
					const res = await fetch('/api/users', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(userInputdata),
					});
					const data = await res.json();
					return data;
				};
				postData().then(
					localStorage.setItem(
						'username',
						`${userInputdata.firstname} ${userInputdata.lastname}`
					),
					localStorage.setItem('email', `${userInputdata.email}`),
					setTimeout(() => {
						setconfirmPasswordValid(
							<span className={styles.formSuccess}>
								{exclamationIcon}
								<span>Your Account has been created sucessfully</span>
							</span>
						);
						setloading(
							<>
								Signing in
								<span className="dotTyping"></span>
							</>
						);
						push('/')
					}, 1500),
				);
			}
		});
	};
	return (
		<>
			<Meta
				title={'Create New Account'}
				description={'Mabifus Signup / Create New Account page'}
				keywords={
					'mabifus, mabifus signup, mabifus create new account, mabifus open an account, mabifus medical page open'
				}
			/>
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
					<form method="post" className={styles.form}>
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
							<span onClick={showPassword}>{passwordIcon}</span>
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
							<span onClick={showConfirmPassword}>{confirmpasswordIcon}</span>
							<p className={styles.confirmpasswordvalid}>
								{confirmPasswordValid}
							</p>
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
