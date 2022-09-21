import Link from 'next/link';
import styles from '../src/styles/Contact.module.css';

const FormSubmit = () => {
	return (
		<main className={styles.formSubmit}>
			<i className="fas fa-square-check"></i>
			<p>your message has been sent</p>
			<Link href="/">
				<a>Back to home</a>
			</Link>
		</main>
	);
};

export default FormSubmit;
