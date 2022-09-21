import { Chart as ChartJS } from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const Chart = () => {
	const [hydrated, sethydrated] = useState(false);
	const [heartweek, setheartweek] = useState(
		Math.floor(Math.random() * (90 - 80 + 1) + 80)
	);
	useEffect(() => sethydrated(true), []);
	const data = [
		heartweek,
		Math.floor(Math.random() * (90 - 80 + 1) + 80),
		Math.floor(Math.random() * (90 - 80 + 1) + 80),
		Math.floor(Math.random() * (90 - 80 + 1) + 80),
		Math.floor(Math.random() * (90 - 80 + 1) + 80),
		Math.floor(Math.random() * (90 - 80 + 1) + 80),
		Math.floor(Math.random() * (90 - 80 + 1) + 80),
	];
	const reducer = (accumulator, curr) => accumulator + curr;
	const average = Math.round(data.reduce(reducer) / 7);
	const heartweekchange = () => {
		setheartweek(Math.floor(Math.random() * (90 - 80 + 1) + 80));
	};
	const date = new Date();
	let month = date.toLocaleString('default', { month: 'long' });
	let year = date.getFullYear();
	ChartJS;

	return (
		<section className="chart">
			<div>
				<div>
					<h2>Performance Heart Rate</h2>
					<select
						name="heart-rate week"
						id="heart"
						className="select"
						onChange={heartweekchange}
					>
						<option value="1-7 {month} {year}">
							1 - 7 {month} {year}
						</option>
						<option value="8-14 {month} {year}">
							8 - 14 {month} {year}
						</option>
						<option value="15-21 {month} {year}">
							15 - 21 {month} {year}
						</option>
						<option value="22ss-30 {month} {year}">
							22 - 30 {month} {year}
						</option>
					</select>
				</div>
				<div className="average">
					{hydrated && (
						<span style={average > 85 ? { color: 'red' } : { color: 'green' }}>
							{average + ' '}
						</span>
					)}
					bmp Average
				</div>
			</div>
			<div>
				<Line
					data={{
						labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
						datasets: [
							{
								label: 'Heart Rate',
								data: [...data],
								borderColor: '#585ce5',
								borderWidth: 3,
							},
						],
					}}
					height={400}
					width={400}
					options={{
						maintainAspectRatio: false,
						scales: {
							yAxes: {
								ticks: {
									beginAtZero: true,
								},
							},
						},
						legend: {
							labels: {
								fontSize: 25,
							},
						},
					}}
				/>
			</div>
		</section>
	);
};

export default Chart;
