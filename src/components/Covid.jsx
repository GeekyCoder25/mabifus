/* eslint-disable @next/next/no-img-element */
const Covid = () => {
	return (
		<section className="covid">
			<div className="covidHeader">
				<Covid19 img="covid" text="Covid-19 Guidlines" />
			</div>
			<div className="moving">
				<Covid19 img="mask" text="Use face masks" />
				<Covid19 img="shake" text="Avoid Hand Shakes" />
				<Covid19 img="wash" text="Wash your hands" />
				<Covid19 img="sanitizer" text="Use Hand Sanitaizers" />
				<Covid19 img="social" text="Social distancing" />
				<Covid19 img="mask" text="Use face masks" />
				<Covid19 img="shake" text="Avoid Hand Shakes" />
				<Covid19 img="wash" text="Wash your hands" />
				<Covid19 img="sanitizer" text="Use Hand Sanitaizers" />
				<Covid19 img="social" text="Social distancing" />
			</div>
		</section>
	);
};

export default Covid;

export const Covid19 = props => {
	return (
		<div className="covidImage">
			<img src={`/images/${props.img}.png`} alt="doctor logo" />
			<p>{props.text}</p>
		</div>
	);
};
