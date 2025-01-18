import { SocialMediaList } from "@/components/molecules/social-media-card";

export const Footer = () => {
	return (
		<footer className="py-8 md:p-8 border-t border-neutral-800 mt-12">
			<p className="text-neutral-400 text-sm">Copyright © 2024 KevinAdiwiguna</p>
			<SocialMediaList />
		</footer>
	);
};
