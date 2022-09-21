import styles from '../src/styles/Signin.module.css';
import Link from 'next/link';
import Meta from '../src/components/Meta';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Sigin = () => {
	const { push } = useRouter();
	const [loading, setloading] = useState('Login');
	const [emailvalid, setEmailvalid] = useState(false);
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
		setloading(
			<>
				Logging in
				<i className="dotTyping"></i>
			</>
		);
		inputsfilter.forEach(input => {
			const label = input.nextElementSibling;
			label?.classList.add(styles.labelerror);
			input.classList.add(styles.error);
			setloading(<>Login</>);
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
		const getData = async () => {
			const res = await fetch('/api/users');
			const data = await res.json();
			return data;
		};
		getData().then(data => {
			const getUser = data.find(user => user.email === email.value);
			if (
				inputsfilter <= 0 &&
				(email.value.length < 6 ||
					!email.value.includes('@') ||
					!email.value.includes('.'))
			) {
				setEmailvalid(
					<>
						<i className="fas fa-circle-exclamation"></i>
						<> Please input a valid email</>
					</>
				);
				email.classList.add(styles.error);
				setloading(<>Login</>);
			} else if (inputsfilter <= 0 && !getUser) {
				setEmailvalid(
					<>
						<i className="fas fa-circle-exclamation"></i>
						No account is associated with email.{' '}
						<Link href={'/signup'}>
							<a className={styles.formvalidlink}>Create account</a>
						</Link>
					</>
				);
				setloading(<>Login</>);
			} else if (inputsfilter <= 0 && password.value !== getUser.password) {
				setPasswordValid(
					<>
						<i className="fas fa-circle-exclamation"></i>
						<>Incorrect password</>
					</>
				);
				password.classList.add(styles.error);
				setloading(<>Login</>);
			} else if (inputsfilter <= 0) {
				console.log('Logging In');
				setTimeout(() => {
					push('/');
				}, 1500);
				localStorage.setItem('mabifusUserToken', `${getUser._id}`);
			}
		});
	};
	return (
		<>
			<Meta
				title="Log in"
				description={'Mabifus Signin'}
				keywords={
					'mabifus, mabifus signin, mabifus login, mabifus medical page signin '
				}
			/>
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
							<p className={styles.formvalid}>{emailvalid}</p>
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

// Sigin.getLayout = page => <>{page}</>;
