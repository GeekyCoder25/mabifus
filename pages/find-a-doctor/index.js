import styles from '../../src/styles/Find-a-doctor.module.css';
import Link from 'next/link';
import Meta from '../../src/components/Meta';
import Image from 'next/image';
import { useEffect, useState } from 'react';
const Find = () => {
	const [imageIndex, setimageIndex] = useState(0);
	const [doctors, setdoctors] = useState(null);
	const [fetchAll, setfetchAll] = useState('See all');
	const findDoctor = ['profileimage1', 'profileimage2', 'profileimage3'];

	useEffect(() => {
		const slider = setTimeout(() => {
			if (imageIndex >= findDoctor.length - 1) setimageIndex(0);
			else setimageIndex(prevIndex => prevIndex + 1);
			const profileimage = document.querySelector('.profileimage');
			profileimage.classList.add(styles.animation);
			setTimeout(() => {
				profileimage.classList.remove(styles.animation);
			}, 4000);
		}, 5000);
		return () => clearTimeout(slider);
	}, [findDoctor.length, imageIndex]);

	useEffect(() => {
		fetch('/api/doctorslist')
			.then(res => res.json())
			.then(data => setdoctors(data.slice(0, 6)));
	}, []);

	const showAll = () => {
		fetchAll === 'See all'
			? fetch('/api/doctorslist')
					.then(res => res.json())
					.then(data => setdoctors(data), setfetchAll('Cancel'))
			: fetch('/api/doctorslist')
					.then(res => res.json())
					.then(data => setdoctors(data.slice(0, 6)), setfetchAll('See all'));
	};

	return (
		<>
			<Meta
				title="Find a Doctor"
				description={'Mabifus Find a doctor'}
				keywords={
					'mabifus, mabifus find a doctor, mabifus medical page find a doctor '
				}
			/>
			<article className={styles.findADoctorStyles}>
				<h1 className={styles.header}>
					Find a doctor or request an appoitment
				</h1>
				<div className={styles.doctorimagemobile}>
					<Image
						className="profileimage"
						src={`/images/${findDoctor[imageIndex]}.jpg`}
						alt="doctor"
						width={600}
						height={400}
						placeholder="blur"
						blurDataURL="/images/placeholder.gif"
					/>
				</div>
				<div className={styles.doctorimage}>
					{findDoctor.map(doctor => (
						<Image
							key={doctor}
							className="profileimage"
							src={`/images/${doctor}.jpg`}
							alt="doctor"
							width={600}
							height={400}
							placeholder="blur"
							blurDataURL="/images/placeholder.gif"
						/>
					))}
				</div>
				<section className={styles.branches}>
					<div>
						<Image
							alt="cardiology"
							src="/images/cardiology.jpg"
							width={50}
							height={50}
						/>
						<p>Cardiology</p>
					</div>
					<div>
						<Image
							alt="gastrology"
							src="/images/gastrology.jpg"
							width={50}
							height={50}
						/>
						<p>Gastrology</p>
					</div>
					<div>
						<Image
							alt="neurology"
							src="/images/neurology.jpg"
							width={50}
							height={50}
						/>
						<p>Neurology</p>
					</div>
				</section>
				<section className={styles.doctorslistcontainer}>
					<div className={styles.header}>
						<h2>Top Doctors</h2>
						<h4 onClick={() => setdoctors(showAll)}>{fetchAll}</h4>
					</div>
					<section className={styles.doctorslistsubcontainer}>
						{doctors &&
							doctors.map(doctor => (
								<Link href={`/find-a-doctor/${doctor.name}`} key={doctor._id}>
									<a>
										<div className={styles.doctorslist}>
											<div>
												<Image
													alt={doctor.img}
													src={`/images/${doctor.img}`}
													width={100}
													height={100}
												/>
											</div>
											<div>
												<h1>{doctor.name}</h1>
												<p>
													{doctor.aspect} - {doctor.country}
												</p>
												<span>
													<i className="fas fa-clock"></i>
													{doctor.startTime} - {doctor.endTime}
												</span>
												<div>
													<span>{`$ ${doctor.price}`}</span>
													<button type="submit">Appointment</button>
												</div>
											</div>
										</div>
									</a>
								</Link>
							))}
					</section>
				</section>
			</article>
		</>
	);
};

export default Find;
