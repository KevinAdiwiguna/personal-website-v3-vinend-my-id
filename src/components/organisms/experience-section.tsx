import { EXPERIENCE } from "@/constant/experience";
import { ExperienceCard } from "../molecules/experience-card";

import { FaBriefcase } from 'react-icons/fa';

export const ExperienceSection = () => {
	return (
		<div className="mt-16 md:mt-20" id="experience">
			<section className="border-b pb-6 border-dashed">
				<div className="font-bold flex gap-2 items-center">
					<FaBriefcase className="text-2xl" />
					<h1 className="text-2xl">My Experience</h1>
				</div>
				<div className="mt-2 text-base-content">Navigating diverse environments with adaptability and expertise for holistic solutions.</div>
			</section>

			{EXPERIENCE.map((res, key) => {
				return <ExperienceCard {...res} key={key} />;
			})}
		</div>
	);
};
