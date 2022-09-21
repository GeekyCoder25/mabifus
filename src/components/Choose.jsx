import Image from 'next/image';

const ChooseSection = () => {
	return (
		<section className="chooseContainer">
			<button>Why Choose Us</button>
			<h1>Get Benefts & Advantages</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea corporis eum
				sunt obcaecati, incidunt rem facilis inventore tempora similique et
				pariatur ipsum quia dolor aut laboriosam. Quas assumenda iure amet
			</p>
			<div className="chooseBoxContainer">
				<ChooseBox icon="calendar" heading="1 Year Free Trial" />
				<ChooseBox icon="clock" heading="Simple and Effiecient" />
				<ChooseBox icon="heart" heading="User Friendly" />
				<ChooseBox icon="arrows-rotate" heading="Livetime Update" />
			</div>
		</section>
	);
};

export default ChooseSection;

export const ChooseBox = props => {
	return (
		<div className="chooseBox">
			<div className="chooseBoxImage">
				<div className="mac">
					<i style={{ backgroundColor: '#ff605c' }}></i>
					<i style={{ backgroundColor: '#ffdb44' }}></i>
					<i style={{ backgroundColor: '#00ca4e' }}></i>
				</div>
				<Image
					src="/images/placeholder.gif"
					alt="doctor logo"
					width={700}
					height={500}
				/>
				<i className={`fas fa-${props.icon}`}></i>
			</div>
			<h2>{props.heading}</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
				aspernatur tempora magni? Deserunt provident autem error maxime
				repellendus ipsum.
			</p>
		</div>
	);
};
