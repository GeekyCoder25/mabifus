import Image from 'next/image';

const Test = ({ tests }) => {
	// console.log(tests);
	return (
		<section className="tests">
			{tests.map(test => (
				<div key={test.id} className="tests-grid">
					<i className={`fas fa-${test.icon}`}></i>
					<h2>{test.title}</h2>
					<p>{test.value}</p>
					<div>
						{test.istrue ? (
							<Image
								src="/images/arrowchartdown.png"
								alt=""
								width={30}
								height={30}
							/>
						) : (
							<Image
								src="/images/arrowchartup.png"
								alt=""
								style={{ marginRight: '5px' }}
								width={30}
								height={30}
							/>
						)}
						{test.rate}
					</div>
				</div>
			))}
		</section>
	);
};

export default Test;
