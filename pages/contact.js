import Link from 'next/link';
import { useRef, useState } from 'react';
import Meta from '../src/components/Meta';
import styles from '../src/styles/Contact.module.css';

const Contact = () => {
	const nameRef = useRef();
	const emailRef = useRef();
	const checkboxRef = useRef();
	const textareaRef = useRef();
	const [formValid, setFormValid] = useState('');
	const [contactFormData, setContactFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [exclamationIcon] = useState(
		<i className="fas fa-circle-exclamation"></i>
	);
	const handleFormChange = e => {
		setFormValid('');
		setContactFormData(prevState => {
			return { ...prevState, [e.target.name]: e.target.value };
		});
	};
	const handleSubmit = e => {
		const inputs = document.querySelectorAll('input');
		const inputsFilter = [...inputs, textareaRef.current].filter(
			input => input.value === ''
		);

		if (inputsFilter.length > 0) {
			e.preventDefault();
			setFormValid('Please input all fields');
		} else if (
			emailRef.current.value.length < 6 ||
			!emailRef.current.value.includes('@') ||
			!emailRef.current.value.includes('.')
		) {
			e.preventDefault();
			setFormValid('Input a Valid Email');
		} else if (!checkboxRef.current.checked) {
			e.preventDefault();
			checkboxRef.current.nextElementSibling.classList.add(
				styles.acceptTermsError
			);
			setTimeout(
				() =>
					checkboxRef.current.nextElementSibling.classList.remove(
						styles.acceptTermsError
					),
				500
			);
		} else {
			(nameRef.current.value !== 'delete' || !checkboxRef.current.checked) &&
				fetch('/api/contact', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(contactFormData),
				}).then(console.log('form submitted'));
		}
		nameRef.current.value === 'delete' &&
			checkboxRef.current.checked &&
			fetch('/api/contact', {
				method: 'DELETE',
			}).then(setFormValid('ALL CONTACT FORMS DELETED'));
	};
	return (
		<article className={styles.contactStyles}>
			<Meta
				title="User Profile"
				description={'Mabifus user profile page'}
				keywords={
					'mabifus, mabifus profile, mabifus user, mabifus user profile page'
				}
			/>

			<main>
				<header className={styles.header}>
					<div className={styles.headerDoctor}></div>
					<section className={styles.formContainer}>
						<h1>Contact Us</h1>
						<form
							action="https://formsubmit.co/toyibe25@gmail.com"
							method="POST"
							className={styles.form}
						>
							<input
								type="hidden"
								name="_next"
								value="https://mabifus.vercel.app/formsubmit"
							/>
							<input
								type="hidden"
								name="_subject"
								value="Mabifus Health Care Form Submit"
							/>
							<input type="hidden" name="_captcha" value="false" />
							<label htmlFor="name">Name</label>
							<input
								type="text"
								name="name"
								id="name"
								placeholder="Enter your name"
								onChange={handleFormChange}
								value={contactFormData.name}
								ref={nameRef}
								required
							/>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Enter a valid email address"
								onChange={handleFormChange}
								value={contactFormData.email}
								ref={emailRef}
								required
							/>
							<label htmlFor="name">Message</label>
							<textarea
								type="text"
								name="message"
								id="message"
								onChange={handleFormChange}
								value={contactFormData.message}
								ref={textareaRef}
								required
							/>
							<fieldset>
								<input
									type="checkbox"
									id="terms"
									onChange={handleFormChange}
									ref={checkboxRef}
									required
								/>
								<label htmlFor="terms">
									I accept the{' '}
									<Link href="">
										<a>Terms of Service</a>
									</Link>
								</label>
							</fieldset>
							<p className={styles.formValid}>
								{formValid && exclamationIcon} {formValid}
							</p>
							<button onClick={handleSubmit}>SUBMIT</button>
						</form>
					</section>
				</header>
				<section className={styles.contactFooter}>
					<div>
						<span>
							<i className="fas fa-phone"></i>
							<h2>Call Us</h2>
						</span>
						<p>(+234) 907-3002-599</p>
						<p>(+234) 903-0582-706</p>
					</div>
					<div>
						<span>
							<i className="fas fa-location-dot"></i>
							<h2>Location</h2>
						</span>
						<p>Ibrahim Taiwo Road, Ilorin, Kwara State, Nigeria</p>
					</div>
					<div>
						<span>
							<i className="fas fa-clock"></i>
							<h2>Hours</h2>
						</span>
						<p>Mon-Sat.... 8 am - 6 pm, Sun 9 am - 3 pm</p>
					</div>
				</section>
				<p className={styles.contactEasily}>
					Want to make an appointment easily?{' '}
					<Link href="https://wa.me/2348100998727">
						<a>Contact Here</a>
					</Link>
				</p>
			</main>
		</article>
	);
};

export default Contact;
