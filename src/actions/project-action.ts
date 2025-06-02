"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db/db";

import { auth } from "@/lib/auth";

import cloudinary from "@/lib/cloudinary";

import { ITEMS_PER_PAGE, QueryParamsProps, ResponseState } from "@/types/globals";

export const GetAllProject = async ({ query, page }: QueryParamsProps) => {
	const offest = (page - 1) * ITEMS_PER_PAGE;

	try {
		const getBlog = await db.project.findMany({
			skip: offest,
			take: ITEMS_PER_PAGE,
			orderBy: {
				updatedAt: "desc",
			},
			where: {
				OR: [
					{
						title: {
							contains: query,
							mode: "insensitive",
						},
					},
					{
						description: {
							contains: query,
							mode: "insensitive",
						},
					},
					{
						user: {
							name: {
								contains: query,
								mode: "insensitive",
							},
							email: {
								contains: query,
								mode: "insensitive",
							},
						},
					},
				],
			},
			select: {
				id: true,
				thumbnail: true,
				userId: true,
				title: true,
				description: true,
				updatedAt: true,
				viewCount: true,
				tags: {
					select: {
						tag: {
							select: {
								id: true,
								tag: true,
							},
						},
					},
				},
				technologies: {
					select: {
						technology: {
							select: {
								id: true,
								tech: true,
							},
						},
					},
				},
				user: {
					select: {
						name: true,
						email: true,
						image: true,
					},
				},
			},
		});
		return {
			status: 200,
			message: "Project fetched successfully",
			data: getBlog || [],
			timeStamp: new Date(),
		};
	} catch (error) {
		return {
			status: 500,
			message: `Failed to fetch project ${error}`,
			timeStamp: new Date(),
		};
	}
};

export const GetNewProject = async (limit: number) => {
	try {
		const getBlog = await db.project.findMany({
			take: limit,
			orderBy: {
				updatedAt: "desc",
			},
			select: {
				id: true,
				userId: true,
				title: true,
				description: true,
				thumbnail: true,
				updatedAt: true,
				viewCount: true,
				user: {
					select: {
						name: true,
						email: true,
						image: true,
					},
				},
				tags: {
					select: {
						tag: {
							select: {
								id: true,
								tag: true,
							},
						},
					},
				},
				technologies: {
					select: {
						technology: {
							select: {
								id: true,
								tech: true,
								images: true,
							},
						},
					},
				},
			},
		});
		return {
			status: 200,
			message: "Project fetched successfully",
			data: getBlog || [],
			timeStamp: new Date(),
		};
	} catch (error) {
		return {
			status: 500,
			message: `Failed to fetch project ${error}`,
			timeStamp: new Date(),
		};
	}
};

export const GetProjectByCount = async (query: string) => {
	const user = await db.project.count({
		where: {
			OR: [
				{
					title: {
						contains: query,
						mode: "insensitive",
					},
				},
				{
					description: {
						contains: query,
						mode: "insensitive",
					},
				},
				{
					user: {
						name: {
							contains: query,
							mode: "insensitive",
						},
						email: {
							contains: query,
							mode: "insensitive",
						},
					},
				},
			],
		},
	});
	const totalPages = Math.ceil(Number(user) / ITEMS_PER_PAGE);
	return totalPages;
};

export const GetProjectID = async (id: string) => {
	if (!id || isNaN(parseInt(id))) {
		redirect("/404");
	}
	try {
		const checkProject = await db.project.findUnique({
			where: {
				id: parseInt(id),
			},
		});

		if (!checkProject) {
			redirect("/404");
		}

		await db.project.update({
			where: {
				id: parseInt(id),
			},
			data: {
				viewCount: {
					increment: 1,
				},
			},
		});

		const getBlog = await db.project.findUnique({
			where: {
				id: parseInt(id),
			},
			select: {
				id: true,
				userId: true,
				title: true,
				description: true,
				content: true,
				thumbnail: true,
				updatedAt: true,
				viewCount: true,
				user: {
					select: {
						name: true,
						email: true,
						image: true,
					},
				},
				tags: {
					select: {
						tag: {
							select: {
								id: true,
								tag: true,
							},
						},
					},
				},
				technologies: {
					select: {
						technology: {
							select: {
								id: true,
								tech: true,
								images: true,
							},
						},
					},
				},
			},
		});

		if (!getBlog) {
			redirect("/404");
		}

		return {
			status: 200,
			message: "Project fetched successfully",
			data: getBlog,
			timeStamp: new Date(),
		};
	} catch (error) {
		return {
			status: 500,
			message: `Failed to fetch project ${error}`,
			timeStamp: new Date(),
		};
	}
};

export const CreateProject = async (previousState: unknown, formData: FormData): Promise<ResponseState> => {
	const session = await auth();
	if (!session?.user?.email) {
		redirect("/auth/signin");
	}

	const checkUser = await db.user.findUnique({
		where: {
			email: session.user.email,
		},
	});

	if (!checkUser || (checkUser.role !== "ADMIN" && checkUser.role !== "EDITOR")) {
		redirect("/auth/signin");
	}

	const image = formData.get("images") as File | null;
	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	const content = formData.get("content") as string;
	const tags = formData.getAll("tags") as string[];
	const technologies = formData.getAll("tech") as string[];

	if (!image) {
		return {
			status: 400,
			message: "Invalid image data type",
			timeStamp: new Date(),
		};
	}

	if (!title || !description || !content) {
		return {
			status: 400,
			message: "Invalid title, description, or content",
			timeStamp: new Date(),
		};
	}

	if (!tags.every((tag) => !isNaN(parseInt(tag, 10)))) {
		return {
			status: 400,
			message: "Invalid tags format",
			timeStamp: new Date(),
		};
	}

	if (!technologies.every((tech) => !isNaN(parseInt(tech, 10)))) {
		return {
			status: 400,
			message: "Invalid technologies format",
			timeStamp: new Date(),
		};
	}

	const parsedTags = tags.map((tag) => parseInt(tag, 10));
	const parsedTechnologies = technologies.map((tech) => parseInt(tech, 10));

	try {
		const arrayBuffer = await image.arrayBuffer();
		const buffer = new Uint8Array(arrayBuffer);

		const imageUrl = await new Promise<string>((resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ folder: "project", allowed_formats: ["heic", "gif", "jpg", "png", "webp", "mp4", "svg"] }, (error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(result?.url || "");
					}
				})
				.end(buffer);
		});

		const project = await db.project.create({
			data: {
				title: title,
				description: description,
				content: content,
				thumbnail: imageUrl,
				userId: checkUser.id,
				viewCount: 0,
			},
		});

		if (parsedTags.length > 0) {
			await db.tagRelation.createMany({
				data: parsedTags.map((tagId) => ({
					projectId: project.id,
					tagId,
				})),
			});
		}

		if (parsedTechnologies.length > 0) {
			await db.technologyRelation.createMany({
				data: parsedTechnologies.map((techId) => ({
					projectId: project.id,
					techId,
				})),
			});
		}

		return {
			status: 201,
			message: "Project created successfully",
			timeStamp: new Date(),
		};
	} catch (error) {
		return {
			status: 500,
			message: `Failed to create project ${error}`,
			timeStamp: new Date(),
		};
	} finally {
		revalidatePath("/dashboard/projects");
	}
};

export const CheckProjectCount = async () => {
	const blogCount = await db.project.count({
		take: 3,
	});
	return blogCount;
};

export const DeleteProject = async (previousState: unknown, formData: FormData): Promise<ResponseState> => {
	const id = formData.get("id") as string;

	if (!id || isNaN(parseInt(id, 10))) {
		return {
			status: 400,
			message: "Invalid project id",
			timeStamp: new Date(),
		};
	}

	try {
		await db.project.delete({
			where: {
				id: parseInt(id),
			},
		});

		return {
			status: 200,
			message: "Project deleted successfully",
			timeStamp: new Date(),
		};
	} catch (error) {
		return {
			status: 500,
			message: `Failed to delete project ${error}`,
			timeStamp: new Date(),
		};
	} finally {
		revalidatePath("/dashboard/projects");
	}
};
