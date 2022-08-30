import Link from 'next/link';

const ErrorPage = () => {
	return (
		<div>
			<h1>Page Not Found</h1>
			<Link href="/home">
				<a>Back to Home</a>
			</Link>
		</div>
	);
};

export default ErrorPage;
