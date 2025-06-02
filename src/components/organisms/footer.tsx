import { SocialMediaList } from "@/components/molecules/social-media-card";

export const Footer = () => {
	return (
		<footer className="py-8 md:p-8 border-t border-neutral-800 mt-12">
			<p className="text-base-content text-sm">Copyright © 2024-2025 KevinAdiwiguna</p>
			<SocialMediaList />
		</footer>
	);
};
