const Offer = () => {
	return (
		<section className="offerContainer">
			<button>What we Offer</button>
			<div className="offerBox">
				<div>
					<i className="fas fa-truck-medical"></i>
					<h1>Emmergency Unit</h1>
					<p>
						Our ambulance is fully equiped with medical equiqments and they are
						manned by specailist in thier fields. We are always available to
						respond to calls and treat patience.
					</p>
					<button>Learn More</button>
				</div>
				<div>
					<i className="fas fa-user-doctor"></i>
					<h1>Medical Checkup</h1>
					<p>
						This unit contains daily lesson plans, activities & exercise which
						helps to strenghten patients/trainees and build up minds both
						physically & mentally in their everyday life.
					</p>
					<button>Learn More</button>
				</div>
				<div>
					<i className="fas fa-first-aid"></i>
					<h1>First Aid</h1>
					<p>
						We give emergency care to patients or victims with either serious o
						minor injury or even mild illness so as to preserve lives. This is
						done by trained personnels.
					</p>
					<button>Learn More</button>
				</div>
			</div>
		</section>
	);
};

export default Offer;
