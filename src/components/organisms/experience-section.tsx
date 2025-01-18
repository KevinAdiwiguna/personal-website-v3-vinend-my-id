import { EXPERIENCE } from "@/constant/experience";
import { ExperienceCard } from "../molecules/experience-card";

import { FaBriefcase } from 'react-icons/fa';

export const ExperienceSection = () => {
	return (
		<div className="mt-16 md:mt-20" id="experience">
			<section className="border-b border-neutral-800 pb-6 border-dashed">
				<div className="font-bold flex gap-2 items-center">
					<FaBriefcase className="text-2xl" />
					<h1 className="text-2xl">My Experience</h1>
				</div>
				<div className="basic-description-color mt-2">
					Navigating diverse environments with adaptability and expertise for holistic
					solutions.
				</div>
			</section>

			{EXPERIENCE.map((res, key) => {
				return <ExperienceCard {...res} key={key} />;
			})}
		</div>
	);
};
