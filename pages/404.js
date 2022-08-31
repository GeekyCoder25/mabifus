import Link from 'next/link';

const ErrorPage = () => {
	return (
		<div className='errorpage'>
			<i className="fas fa-face-sad-tear"></i>
			<h1>Page Not Found</h1>
			<Link href="/">
				<a>Back to Home</a>
			</Link>
		</div>
	);
};

export default ErrorPage;
