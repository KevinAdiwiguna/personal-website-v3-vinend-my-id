import { STACK } from "@/constant/stack";
import { StackCard } from "../molecules/stack-card";
import { MdExtension } from "react-icons/md";

export const StackSection = () => {
  return (
		<div className="mt-16 md:mt-20" id="stacks">
			<section className="border-b pb-6 border-dashed ">
				<div className="font-bold flex gap-2 items-center">
					<MdExtension className="text-2xl" />
					<h1 className="text-2xl text-base-content">My Stacks</h1>
				</div>
				<p className="text-base-content">Here are some of the technologies I&aposve been working with recently:</p>
			</section>

			<section className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
				{STACK.map((res, key) => {
					return <StackCard {...res} key={key} />;
				})}
			</section>
		</div>
	);
};
