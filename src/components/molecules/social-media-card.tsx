import { SOCIALMEDIA } from "@/constant/social-media";
import { ActionButton } from "@/components/atoms/button";


interface SocialMediaListProps {
	isCol?: boolean;
	responsive?: boolean;
}

export const SocialMediaList = ({
	isCol = false,
	responsive = false,
}: SocialMediaListProps) => {
	return (
		<div
			className={`items-center gap-3 mt-2 flex ${responsive && "md:hidden"} ${isCol ? "flex-col" : "flex-wrap"
				}`}>
			{SOCIALMEDIA.map((res, key) => {
				return (
					<ActionButton
						tooltip={res.tooltip}
						key={key}
						target="_blank"
						className="text-neutral-400 navigation-button"
						to={res.url}>
						{res.icon}
					</ActionButton>
				);
			})}
		</div>
	);
};
