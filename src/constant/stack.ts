interface StackProps {
	name: string;
	img: string;
	description: string;
	star: boolean;
	link: string
}

export const STACK: StackProps[] = [
	{
		name: "React",
		img: "/logos/react.svg",
		description: "Library JavaScript",
		star: true,
		link: "https://react.dev/",
	},
	{
		name: "Next.js",
		img: "/logos/nextjs.svg",
		description: "Framework React Web",
		star: true,
		link: "https://nextjs.org/",
	},
	{
		name: "Tailwind",
		img: "/logos/tailwind.svg",
		description: "Utility-first CSS framework",
		star: true,
		link: "https://tailwindcss.com/",
	},
	{
		name: "Qwik",
		img: "/logos/qwik.svg",
		description: "Framework Web",
		star: true,
		link: "https://qwik.builder.io/",
	},
	{
		name: "Remix",
		img: "/logos/remix.svg",
		description: "Framework Web",
		star: true,
		link: "https://remix.run/",
	},
	{
		name: "Laravel",
		img: "/logos/laravel.svg",
		description: "Framework PHP",
		star: false,
		link: "https://laravel.com/",
	},
	{
		name: "Bootstrap",
		img: "/logos/bootstrap.svg",
		description: "Framework CSS",
		star: true,
		link: "https://getbootstrap.com/",
	},
	{
		name: "Shadcn",
		img: "/logos/shadcn.svg",
		description: "Framework Web",
		star: true,
		link: "https://shadcn.dev/",
	},
	{
		name: "Supabase",
		img: "/logos/supabase.svg",
		description: "Database",
		star: true,
		link: "https://supabase.com/",
	},
	{
		name: "Postgres",
		img: "/logos/postgresql.svg",
		description: "Database",
		star: true,
		link: "https://www.postgresql.org/",
	},
	{
		name: "MySQL",
		img: "/logos/mysql.svg",
		description: "Database",
		star: true,
		link: "https://www.mysql.com/",
	},
	{
		name: "GitLab",
		img: "/logos/gitlab.svg",
		description: "Version Control",
		star: false,
		link: "https://gitlab.com/",
	},
	{
		name: "GitHub",
		img: "/logos/github.svg",
		description: "Version Control",
		star: true,
		link: "https://github.com/",
	},
	{
		name: "Figma",
		img: "/logos/figma.svg",
		description: "Design Tool",
		star: false,
		link: "https://www.figma.com/",
	},
	{
		name: "Notion",
		img: "/logos/notion.svg",
		description: "Productivity Tool",
		star: true,
		link: "https://www.notion.so/",
	},
];
