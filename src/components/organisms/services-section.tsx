import { FaMailchimp } from "react-icons/fa";
import { ServicesCard } from "../molecules/services-card";

export const ServicesSection = () => {
	return (
		<div className="mt-16 md:mt-28" id="services">
			<section className="border-b border-dashed pb-6">
				<div className="flex items-center gap-2 font-bold">
					<FaMailchimp className="text-3xl" />
					<h1 className="text-2xl">My Services</h1>
				</div>
				<div className="mt-2 text-base">Committed and adaptable to new technologies with expertise in them.</div>
			</section>
			<ServicesCard />
		</div>
	);
};
