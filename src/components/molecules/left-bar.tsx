"use client"
import { NAVIGATION } from "@/constant/navigation";
import { ActionButton } from "@/components/atoms/button";
import { FaBloggerB, FaMoon, FaSun } from "react-icons/fa";

// Hooks
// client hooks
import { useChangeTheme } from "@/hooks/useChangeTheme";


export const LeftBar = ({ blogCount, projectCount }: { blogCount: number, projectCount: number }) => {
	const { isDark, toggleTheme } = useChangeTheme();

	return (
		<aside className="sticky top-0 hidden h-screen border-r border-neutral-800 lg:block dark:border-neutral-700">
			<div className="mr-8 flex h-screen flex-col items-end justify-center gap-4">
				<ActionButton onClick={toggleTheme} className="cursor-pointer rounded-md p-3 navigation-button">
					{isDark ? <FaSun /> : <FaMoon />}
				</ActionButton>
				{NAVIGATION.map((res, key) => (
					<ActionButton
						tooltip={res.tooltip}
						key={key}
						to={res.url}
						className="cursor-pointer rounded-md p-3 navigation-button">
						{res.icon}
					</ActionButton>
				))}
				{blogCount > 0 && (
					<ActionButton
						tooltip={"Blogs"}
						to="/#blogs"
						className="cursor-pointer rounded-md p-3 navigation-button">
						<FaBloggerB />
					</ActionButton>
				)}
				{projectCount > 0 && (
					<ActionButton
						tooltip={"Project"}
						to="/#project"
						className="cursor-pointer rounded-md p-3 navigation-button">
						<FaBloggerB />
					</ActionButton>
				)}
			</div>
		</aside>
	);
};
