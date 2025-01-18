import { FaReact, FaGithub, FaGitlab, FaLaravel, FaFigma, FaBootstrap } from 'react-icons/fa';
import { SiNextdotjs, SiQwik, SiRemix, SiTailwindcss, SiShadcnui, SiSupabase, SiNotion, SiMysql } from 'react-icons/si';
import { BiLogoPostgresql } from "react-icons/bi";

interface Technology {
	name: string;
	logo: React.ReactNode;
}

export const TECHNOLOGIES: Technology[] = [
	{ name: "Next.js", logo: <SiNextdotjs /> },
	{ name: "Qwik", logo: <SiQwik /> },
	{ name: "Remix", logo: <SiRemix /> },
	{ name: "Laravel", logo: <FaLaravel /> },
	{ name: "React", logo: <FaReact /> },
	{ name: "Tailwind", logo: <SiTailwindcss /> },
	{ name: "Bootstrap", logo: <FaBootstrap /> },
	{ name: "Shadcn", logo: <SiShadcnui /> },
	{ name: "Supabase", logo: <SiSupabase /> },
	{ name: "PostgreSQL", logo: <BiLogoPostgresql /> },
	{ name: "MySQL", logo: <SiMysql /> },
	{ name: "GitLab", logo: <FaGitlab /> },
	{ name: "GitHub", logo: <FaGithub /> },
	{ name: "Figma", logo: <FaFigma /> },
	{ name: "Notion", logo: <SiNotion /> },
];
