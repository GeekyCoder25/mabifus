import { useEffect, useState } from 'react';
const AddNew = props => {
	const [title, settitle] = useState(null);
	const [size, setsize] = useState('1 kb');
	const [namevalid, setnamevalid] = useState(null);

	useEffect(() => {
		let bg = document.querySelector('.bg');
		bg.classList.add('blurbg');
	});

	const addReport = () => {
		let bg = document.querySelector('.bg');
		const addednew = {
			title: title,
			size: size,
			id: props.result.length + 1,
		};
		const file = document.querySelector('#title').value;
		file !== '' && settitle(file);
		if (title === null || title === '' || file === '') {
			setnamevalid(<p className="namevalid">Please Input a file</p>);
		} else {
			bg.classList.remove('blurbg');
			props.setAddNew(null);

			fetch('/api/report', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(addednew),
			})
				.then(props.set([...props.reportBar, addednew]))
				.then(console.log('Yo! The process has benn completed'));
		}
	};
	const escKeyPress = e => {
		e.key === 'Escape' && removeBlur();
	};
	const removeBlur = () => {
		let bg = document.querySelector('.bg');
		bg.classList.remove('blurbg');
		props.setAddNew(null);
	};
	const filename = e => {
		const setfilename = (document.querySelector('#title').value =
			e.target.files[0].name);
		settitle(setfilename);
		e.target.files[0].size / 1048576 < 1
			? setsize(`${Math.ceil(e.target.files[0].size / 1024)} Kb`)
			: setsize(`${Math.ceil(e.target.files[0].size / 1048576)} Mb`);
		if (e.target.files[0].size / 1048576 > 1000) {
			setnamevalid(<p className="namevalid">File is too large</p>);
			document.querySelector('#addFile').setAttribute('disabled', 'disabled');
			document.querySelector('#addFile').classList.add('addfiledisabled');
		} else {
			setnamevalid(null);
			document
				.querySelector('#addFile')
				.removeAttribute('disabled', 'disabled');
			document.querySelector('#addFile').classList.remove('addfiledisabled');
		}
	};

	return (
		<>
			<section className="addnew" onKeyUp={escKeyPress}>
				<h1>Add New Report</h1>
				<div>
					<span className="inputtitle">
						<label htmlFor="title" className="filename">
							File Name:
						</label>
						<input
							type="text"
							name="title"
							id="title"
							autoFocus
							onChange={e => {
								settitle(e.target.value);
							}}
						/>
					</span>
					<span className="inputfile">
						<input type="file" name="file" id="file" onChange={filename} />
					</span>
				</div>
				<button type="submit" onClick={addReport} id="addFile">
					Add
				</button>
				<div>{namevalid}</div>
			</section>
			<div className="bg" onClick={removeBlur}></div>
		</>
	);
};

export { AddNew };

const Report = () => {
	const [reportBar, setReportBar] = useState(null);
	const [addNew, setAddNew] = useState(null);
	const date = new Date();
	let month = date.toLocaleString('default', { month: 'long' });
	let year = date.getFullYear();
	useEffect(() => {
		fetch('/api/report')
			.then(res => res.json())
			.then(data => {
				setReportBar(data);
			});
	}, []);

	return (
		<section className="chart">
			<div>
				<div>
					<h2>Heath Reports Document</h2>
					<select name="heart-rate week" id="heart" className="select">
						<option value="1-7 {month} {year}">
							1 - 7 {month} {year}
						</option>
						<option value="8-14 {month} {year}">
							8 - 14 {month} {year}
						</option>
						<option value="15-21 {month} {year}">
							15 - 21 {month} {year}
						</option>
						<option value="22-30 {month} {year}">
							22 - 30 {month} {year}
						</option>
					</select>
				</div>
				<div>
					<button
						className="addnewbutton"
						onClick={() => {
							setAddNew(
								<AddNew
									setAddNew={setAddNew}
									set={setReportBar}
									reportBar={reportBar}
									result={reportBar.map(result => result.id)}
								/>
							);
						}}
					>
						Add New
					</button>
				</div>
			</div>
			{/* <div>{handleDelete}</div> */}
			{reportBar && reportBar.length > 0 ? (
				<div className="report-content">
					{reportBar.map(result => (
						<section key={result.id}>
							<div>
								<i className="fas fa-file"></i>
								<div>
									<h4>{result.title}</h4>
									<small>{result.size}</small>
								</div>
							</div>
							<span>
								<i
									className="fas fa-trash"
									onClick={() => {
										fetch(`/api/report/${result.id}`, {
											method: 'DELETE',
										}).then(
											setReportBar(reportBar.filter(i => i.id !== result.id))
										);
									}}
								></i>
								<a href="/resume.pdf" download={result.title}>
									<i className="fas fa-download"></i>
								</a>
							</span>
						</section>
					))}
				</div>
			) : (
				<h1 className="noreport">You don&apos;t have any Reports right now</h1>
			)}
			{addNew}
		</section>
	);
};

export default Report;
