import Image from "next/image";
import { ActionButton } from "../atoms/button";
import { cn } from "@/lib/cn";

interface WorkExperience {
	role: string;
	company: string;
	location: string;
	period: string;
	start: string;
	end: string;
	logo: string;
	url: string;
	description: string;
}

export const ExperienceCard = ({ role, company, period, logo, url, description }: WorkExperience) => {
	return (
		<section className="mt-8">
			<div className={"bg-base-100 group transition-all mt-4 rounded-xl p-4 md:p-6 hover:drop-shadow-2xl"}>
				<section className={"flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-0"}>
					<div className="flex items-center gap-3">
						<Image alt={company} width={30} height={30} className="h-[50px] w-[50px] rounded-xl border p-3" src={logo} />
						<div>
							<div className="block items-center gap-2 md:flex">
								<h1 className="font-bold">{company}</h1>
								<div className="flex items-center gap-2 md:hidden">
									<ActionButton target="_blank" rel="noopener noreferrer" className="text-sm md:hidden underline" to={url}>
										{company}
									</ActionButton>
									<p className="text-xs ">•</p>
									<p className="text-xs font-bold italic ">{period}</p>
								</div>
							</div>
							<ActionButton target="_blank" rel="noopener noreferrer" className="hidden text-sm md:block underline" to={url}>
								{company}
							</ActionButton>
						</div>
					</div>

					<div className="hidden items-center gap-2 md:flex">
						<p className="text-lg font-semibold ">{period}</p>
					</div>
				</section>
				<section className={cn("mt-6 rounded-xl border p-4 bg-base-200 border-base-200")}>
					<h2 className="font-bold">{role}</h2>
					<p className="mt-1 text-sm text-base-content">{description}</p>
				</section>
			</div>
		</section>
	);
};
