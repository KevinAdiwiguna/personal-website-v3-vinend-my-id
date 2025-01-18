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

export const EXPERIENCE: WorkExperience[] = [
	{
		url: "https://www.unboxlabs.id",
		logo: "/assets/images/company/unboxlabs.jpg",
		role: "Frontend Developer",
		company: "Unboxlabs.id",
		location: "Tangerang, Indonesia",
		start: "Dec 2023",
		end: "Jul 2024",
		period: "8 Months",
		description:
			"Unboxlabs.id is a web technology bootcamp that has successfully developed various landing pages, increasing user engagement and attracting new clients, thereby expanding Unboxlabs' reach.",
	},
	{
		url: "https://www.sebarin.id",
		logo: "/assets/images/company/sebarin.jpg",
		role: "Frontend Developer",
		company: "Sebarin.id",
		location: "Tangerang, Indonesia",
		start: "Apr 2023",
		end: "Apr 2023",
		period: "1 Months",
		description:
			"Managed and optimized digital invitation templates to enhance usability and client satisfaction. Successfully maintained product functionality with stable performance for users.",
	},
	{
		url: "https://www.cloudgakkai.com",
		logo: "/assets/images/company/cloudgakkai.jpg",
		role: "Frontend Developer",
		company: "cloudgakkai",
		location: "Tangerang, Indonesia",
		start: "Oct 2022",
		end: "Feb 2024",
		period: "1 Years 4 Months",
		description:
			"Contributed to showcasing innovative products in the technology and creative industries. Led a software engineering team to complete projects on time and within budget, achieving high levels of client satisfaction. Developed the product 'Sebarin' from concept to launch and presented the project outcomes as the Team Leader.",
	},
	{
		url: "https://www.fullstacklombok.com",
		logo: "/assets/images/company/fullstacklombok.jpg",
		role: "Frontend Developer",
		company: "fullstacklombok",
		location: "Tangerang, Indonesia",
		start: "dec 2021",
		end: "mar 2022",
		period: "4 Months",
		description:
			"Assisted clients in emergency situations, ensuring they received timely technical support. Contributed to the design and performance enhancements of Full Stack Lombok's website landing page, making it more visually appealing and responsive. Actively built relationships with schools to introduce and promote our software services.",
	},
];
