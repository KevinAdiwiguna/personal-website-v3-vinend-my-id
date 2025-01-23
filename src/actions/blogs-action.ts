"use server"

import { db } from "@/db/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

import cloudinary from "@/lib/cloudinary"

interface GetAllBlogsProps {
  query: string
  page: number
}

const ITEMS_PER_PAGE = 15

export const GetAllBlogs = async ({ query, page }: GetAllBlogsProps) => {
  const offest = (page - 1) * ITEMS_PER_PAGE;

  try {
    const getBlog = await db.blog.findMany({
      skip: offest,
      take: ITEMS_PER_PAGE,
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
          }
        ],
      },
      select: {
        id: true,
        userId: true,
        title: true,
        description: true,
        images: true,
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
              },
            },
          },
        },
      },
    });
    return getBlog || []
  } catch (error) {
    throw new Error(`Failed to fetch blog data ${error}`);
  }
};

export const GetNewBlog = async (limit: number) => {
  try {
    const getBlog = await db.blog.findMany({
      take: limit,
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        userId: true,
        title: true,
        description: true,
        images: true,
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
              },
            },
          },
        },
      },
    });
    return getBlog || []
  } catch (error) {
    throw new Error(`Failed to fetch blog data ${error}`);
  }
}

export const GetBlogsByCount = async (query: string) => {
  const user = await db.blog.count({
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
        }
      ],
    }
  })
  const totalPages = Math.ceil(Number(user) / ITEMS_PER_PAGE);
  return totalPages;
}

export const CreateBlog = async (formData: FormData) => {

  // Autentikasi pengguna
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/auth/signin");
    return;
  }

  // Validasi role pengguna
  const checkUser = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!checkUser || (checkUser.role !== "ADMIN" && checkUser.role !== "EDITOR")) {
    throw new Error("You are not authorized to create a blog");
  }

  // Ekstraksi data dari formData
  const image = formData.get("images") as File | null;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const tags = formData.getAll("tags") as string[];
  const technologies = formData.getAll("tech") as string[];

  // Validasi data
  if (!image || !(image instanceof File)) {
    throw new Error("Invalid or missing image file in formData.");
  }

  if (!title || !description || !content) {
    throw new Error("Invalid blog data. Title, description, and content are required.");
  }

  if (!tags.every((tag) => !isNaN(parseInt(tag, 10)))) {
    throw new Error("Invalid tags format.");
  }

  if (!technologies.every((tech) => !isNaN(parseInt(tech, 10)))) {
    throw new Error("Invalid technologies format.");
  }

  const parsedTags = tags.map((tag) => parseInt(tag, 10));
  const parsedTechnologies = technologies.map((tech) => parseInt(tech, 10));

  try {
    // Upload gambar ke Cloudinary
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const imageUrl = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "blogs", allowed_formats: ["heic", "gif", "jpg", "png", "webp", "mp4"] },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result?.url || "");
          }
        }
      ).end(buffer);
    });

    // Simpan blog ke database
    const blog = await db.blog.create({
      data: {
        title,
        description,
        content,
        images: imageUrl,
        userId: checkUser.id,
        viewCount: 0,
      },
    });

    // Simpan relasi tags ke database
    if (parsedTags.length > 0) {
      await db.tagRelation.createMany({
        data: parsedTags.map((tagId) => ({
          blogId: blog.id,
          tagId,
        })),
      });
    }

    // Simpan relasi teknologi ke database
    if (parsedTechnologies.length > 0) {
      await db.technologyRelation.createMany({
        data: parsedTechnologies.map((techId) => ({
          blogId: blog.id,
          techId,
        })),
      });
    }

    revalidatePath("/dashboard/blogs");
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error(`Failed to create blog: ${error}`);
  } finally {
    redirect("/dashboard/blogs");
  }
};

export const GetBlogByID = async (id: string) => {
  try {
    await db.blog.update({
      where: {
        id: parseInt(id),
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
    const getBlog = await db.blog.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        userId: true,
        title: true,
        description: true,
        content: true,
        images: true,
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
              },
            },
          },
        },
      },
    });

    if (!getBlog) {
      redirect("/404");
    }

    return getBlog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw new Error(`Failed to fetch blog: ${error}`);
  }
}

export const CheckBlogCount = async () => {
  const blog = await db.blog.count({
    take: 3
  })
  return blog
}

export const DeleteBlog = async (formData: FormData) => {
  const id = await formData.get('id') as string


  try {
    if (!id) {
      throw new Error("Invalid blog id")
    }
    await db.blog.delete({
      where: {
        id: parseInt(id),
      }
    })
    revalidatePath("/dashboard/blogs");
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw new Error(`Failed to delete blog: ${error}`);
  }
}