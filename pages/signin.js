import styles from '../src/styles/Signin.module.css';
import Link from 'next/link';
import Meta from '../src/components/Meta';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Sigin = ({ sethandleUserSignIn }) => {
	const { push } = useRouter();
	const [loading, setloading] = useState('Login');
	const [emailvalid, setEmailvalid] = useState(null);
	const [passwordValid, setPasswordValid] = useState('');
	const [showIcon, setShowIcon] = useState(<i className="fas fa-eye"></i>);
	useEffect(() => {
		let inputs = document.querySelectorAll('input');
		inputs.forEach(input => {
			input.addEventListener('blur', e => {
				const label = input.nextElementSibling;
				e.target.value === ''
					? label?.classList.remove(styles.inputfilled)
					: label?.classList.add(styles.inputfilled);
			});
		});
	}, []);
	const passwordInputShow = e => {
		const show = document.querySelector('#show');
		e.target.value === ''
			? show.classList.remove(styles.show)
			: show.classList.add(styles.show);
	};
	const handleShow = () => {
		const passwordInput = document.querySelector('#password');
		if (passwordInput.type === 'password') {
			passwordInput.type = 'text';
			setShowIcon(<i className="fas fa-eye-slash"></i>);
		} else {
			passwordInput.type = 'password';
			setShowIcon(<i className="fas fa-eye"></i>);
		}
	};
	const handleLogin = e => {
		e.preventDefault();
		const inputs = document.querySelectorAll('input');
		const email = document.querySelector('#email');
		const password = document.querySelector('#password');
		const inputsfilter = [...inputs].filter(input => input.value === '');
		inputsfilter.forEach(input => {
			const label = input.nextElementSibling;
			label?.classList.add(styles.labelerror);
			input.classList.add(styles.error);
		});
		inputs.forEach(input => {
			input.addEventListener('change', () => {
				const oppinputsfilter = [...inputs].filter(input => input.value !== '');
				oppinputsfilter.forEach(input => {
					const label = input.nextElementSibling;
					label?.classList.remove(styles.labelerror);
					input.classList.remove(styles.error);
				});
				setEmailvalid(null);
				setPasswordValid(null);
			});
		});
		setloading(<>Login</>);
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
					<> Please input a valid email</>
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
					<>Incorrect password</>
				</>
			);
			password.classList.add(styles.error);
		} else if (inputsfilter <= 0) {
			console.log('Logging In');
			setloading(
				<>
					Logging in
					<i className="dotTyping"></i>
				</>
			);
			setTimeout(() => {
				push('/');
			}, 500);
			sethandleUserSignIn(true);
		}
	};
	return (
		<>
			<Meta title="Sign in" />
			<section className={styles.signinstyles}>
				<nav className={styles.nav}>
					<h1>Mabifus </h1>
					<Link href="/">
						<a>Home</a>
					</Link>
					<Link href="/signup">
						<a>Create New Account</a>
					</Link>
				</nav>
				<main className={styles.main}>
					<header className={styles.header}>
						<h1>Welcome back !</h1>
						<p>Please put in you login credentials below to continue</p>
						<span>
							Don&apos;t have an account?{' '}
							<Link href="/signup">
								<a>Sign up</a>
							</Link>
						</span>
					</header>
					<form action="" className={styles.form}>
						<div>
							<input type="email" name="email" id="email" />
							<label id="label" htmlFor="email">
								Email
							</label>
							{<p className={styles.formvalid}>{emailvalid}</p>}
						</div>
						<div>
							<input
								type="password"
								name="password"
								id="password"
								onChange={passwordInputShow}
							/>
							<label id="label" htmlFor="password">
								{' '}
								Password
							</label>
							<span id="show" onClick={handleShow}>
								{showIcon}
							</span>
							{<p className={styles.formvalid}>{passwordValid}</p>}
							<Link href="#">
								<a className={styles.forgotpassword}>Forgot Password?</a>
							</Link>
						</div>
						<div className={styles.formfooter}>
							<p>
								<label htmlFor="rememberme">Remember me</label>
								<input type="checkbox" name="rememberme" id="rememberme" />
							</p>
							<button type="submit" onClick={handleLogin}>
								{loading}
							</button>
						</div>
					</form>
				</main>
				<footer className={styles.footer}>
					<h1>MABIFUS</h1>
				</footer>
			</section>
		</>
	);
};

export default Sigin;
