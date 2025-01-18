import React from "react";
import { FaGithub, FaLinkedin, FaInstagramSquare } from "react-icons/fa";

interface SocialMediaProps {
	name: string;
	url: string;
	icon: React.ReactNode;
	tooltip?: string;
}

export const SOCIALMEDIA: SocialMediaProps[] = [
	{
		name: "GitHub",
		url: "https://github.com/KevinAdiwiguna",
		icon: <FaGithub />,
		tooltip: "GitHub",
	},
	{
		name: "LinkedIn",
		url: "https://www.linkedin.com/in/kevinadiwiguna/",
		icon: <FaLinkedin />,
		tooltip: "LinkedIn",
	},
	{
		name: "Instagram",
		url: "https://www.instagram.com/kevinadiwiguna",
		icon: <FaInstagramSquare />,
		tooltip: "Instagram",
	},
];
