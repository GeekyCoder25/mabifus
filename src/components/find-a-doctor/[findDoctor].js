import Image from 'next/image';
import styles from '../../src/styles/Find-a-doctor.module.css';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const DoctorsData = () => {
	const { query, push } = useRouter();
	const [doctors, setdoctors] = useState(null);
	const [forwardCheck, setForwardCheck] = useState(null);
	const [monthIndex, setMonthIndex] = useState(0);
	const [monthValue, setMonthValue] = useState(
		new Date().toLocaleString('default', { month: 'long' })
	);
	const ImageHeaderRef = useRef();
	const doctorsSection = useRef();
	const date = new Date();
	const day = date.getDate();
	const months = [
		'January',
		'Feburary',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	useEffect(() => {
		query.findDoctor &&
			fetch(`/api/doctorslist/${query.findDoctor}`)
				.then(res => res.json())
				.then(data => setdoctors(data));
		// const imageBlur = () => {
		// 	if (scrollY > 200) {
		// 		ImageHeaderRef.current.classList.add(styles.doctorImageHeaderBlur);
		// 		doctorsSection.current.classList.add(styles.doctorsSectionActive);
		// 	} else {
		// 		ImageHeaderRef.current.classList.remove(styles.doctorImageHeaderBlur);
		// 		doctorsSection.current.classList.remove(styles.doctorsSectionActive);
		// 	}

		// 	// console.log(ImageHeaderRef.current);
		// };
		// document.addEventListener('scroll', imageBlur);
		// return document.removeEventListener('scroll', imageBlur);
	}, [query.findDoctor]);
	const increaseMonth = () => {
		setMonthIndex(prevState => prevState + 1);
		if (monthValue === 'November') {
			setForwardCheck(true);
			setMonthIndex(0);
		}
		forwardCheck === true
			? setMonthValue(months[monthIndex])
			: setMonthValue(months[date.getMonth() + 1 + monthIndex]);
	};
	const decreaseMonth = () => {
		setMonthIndex(prevState => prevState - 1);
		if (monthValue === 'Feburary') {
			setForwardCheck(true);
			setMonthIndex(11);
		}
		forwardCheck === true
			? setMonthValue(months[monthIndex])
			: setMonthValue(months[date.getMonth() - 1 + monthIndex]);
	};
	return !doctors ? (
		<div className="pageLoading">
			<div>
				Loading
				<span className="dotTypingPageLoading"></span>
			</div>
		</div>
	) : (
		<article className={styles.findADoctorStylesParams}>
			<header className={styles.headerParams}>
				<i
					className="fas fa-angle-left"
					onClick={() => push('/find-a-doctor')}
				></i>
				<div className={styles.doctorImageHeader} ref={ImageHeaderRef}>
					<Image
						alt={doctors.img}
						src={`/images/${doctors.img}`}
						width={500}
						height={500}
					/>
				</div>
				<div className={styles.doctorImageHeaderMobile} ref={ImageHeaderRef}>
					<Image
						alt={doctors.img}
						src={`/images/${doctors.img}`}
						width={1400}
						height={1080}
					/>
				</div>
			</header>
			<section>
				<div className={styles.doctorsSection} ref={doctorsSection}>
					<div className={styles.doctorsSectionHeaderContainer}>
						<div className={styles.doctorsSectionHeader}>
							<h1>{doctors.name}</h1>
							<p>Senior Cardiologist and Surgeon</p>{' '}
							<p> United State medical college & hospital</p>
						</div>
					</div>
					<div className={styles.appointment}>
						<h3>Appointment</h3>
						<span>
							<i className="fas fa-angle-left" onClick={decreaseMonth}></i>
							<span>{monthValue}</span>
							<i className="fas fa-angle-right" onClick={increaseMonth}></i>
						</span>
					</div>
					<div className={styles.calendarContainer}>
						<div>
							<p>{days[date.getDay() - 3]}</p>
							<span>{day - 3}</span>
						</div>
						<div>
							<p>{days[date.getDay() - 2]}</p>
							<span>{day - 2}</span>
						</div>
						<div>
							<p>{days[date.getDay() - 1]}</p>
							<span>{day - 1}</span>
						</div>
						<div className={styles.today}>
							<p>{days[date.getDay()]}</p>
							<span>{day}</span>
						</div>
						<div>
							<p>{days[date.getDay() + 1]}</p>
							<span>{day + 1}</span>
						</div>
						<div>
							<p>{days[date.getDay() + 2]}</p>
							<span>{day + 2}</span>
						</div>
						<div>
							<p>{days[date.getDay() + 3]}</p>
							<span>{day + 3}</span>
						</div>
					</div>
					<div className={styles.appointment}>
						<h3>About</h3>
						<Link href={`tel:${doctors._id}`}>
							<a>Call now</a>
						</Link>
					</div>
					<div className={styles.content}>
						<p>
							{doctors.name} is a long established fact that a reader will be
							didstracted by the readable content of a page when looking at its
							layout. The point of using lorem{' '}
						</p>
					</div>
					<div className={styles.about}>
						<div>
							<p>{doctors.patients}</p>
							<span>Patients</span>
						</div>
						<div>
							<p>{doctors.yearsExp}</p>
							<span>Years Exp</span>
						</div>
						<div>
							<p>{doctors.fieldAmount}</p>
							<span>{doctors.field}</span>
						</div>
						<div>
							<p>{doctors.rating}</p>
							<span>Rating</span>
						</div>
					</div>
				</div>
				<div className={styles.footer}>
					<p>Fee: ${doctors.price}</p>
					<Link href={`https://wa.me/${doctors._id}`}>
						<a>Appointment</a>
					</Link>
				</div>
			</section>
		</article>
	);
};

export default DoctorsData;
