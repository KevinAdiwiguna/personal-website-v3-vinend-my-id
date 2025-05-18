import { TECHNOLOGIES } from "@/constant/tech";

export const TechScroll = () => {
  return (
		<section>
			<div className="relative overflow-hidden py-4 mt-6 bg-base-100 rounded-md">
				{/* <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10"></div> */}

				<div className="flex whitespace-nowrap">
					<ul className="flex animate-infinite-scroll list-none">
						{TECHNOLOGIES.map((tech, index) => (
							<li key={index} className="flex gap-2 items-center mx-8">
								{tech.logo}
								<h3 className="font-semibold text-base-content">{tech.name}</h3>
							</li>
						))}
					</ul>
				</div>

				{/* Gradient effect */}
				{/* <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10"></div> */}
			</div>
		</section>
	);
};
