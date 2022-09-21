import Image from 'next/image';

const Test = ({ tests }) => {
	return (
		<section className="tests">
			{tests.map(test => (
				<div key={test._id} className="tests-grid">
					<i className={`fas fa-${test.icon}`}></i>
					<h2>{test.title}</h2>
					<p>{test.value}</p>
					<div>
						{test.istrue ? (
							<Image
								src="/images/arrowchartup.png"
								alt="img"
								width={30}
								height={30}
							/>
						) : (
							<Image
								src="/images/arrowchartdown.png"
								alt="img"
								style={{ marginRight: '5px' }}
								width={30}
								height={30}
							/>
						)}
						<span>
							{`${test.rate} ${test.istrue ? 'Higher' : 'Less'}`} Than Last
							Month
						</span>
					</div>
				</div>
			))}
		</section>
	);
};

export default Test;
