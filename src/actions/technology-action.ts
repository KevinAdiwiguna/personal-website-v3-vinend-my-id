"use server"

import { db } from "@/db/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import cloudinary from "@/lib/cloudinary"

interface GetAllTechnologyProps {
  query: string
  page: number
}

const ITEMS_PER_PAGE = 15

export const GetAllTechnology = async ({ query, page }: GetAllTechnologyProps) => {
  const offest = (page - 1) * ITEMS_PER_PAGE

  try {
    const users = await db.technology.findMany({
      skip: offest,
      take: ITEMS_PER_PAGE,
      where: {
        deletedAt: null,
        OR: [
          {
            tech: {
              contains: query,
              mode: "insensitive"
            }
          }
        ]
      }
    })
    return users
  } catch (error) {
    throw new Error(`Failed to fetch contact data ${error}`);
  }

}

export const GetTechnologyByCount = async (query: string) => {
  const user = await db.technology.count({
    where: {
      deletedAt: null,
      OR: [
        {
          tech: {
            contains: query,
            mode: "insensitive"
          }
        }
      ]
    }
  })
  const totalPages = Math.ceil(Number(user) / ITEMS_PER_PAGE);
  return totalPages;
}

export const DeleteUTechnologyByID = async (formData: FormData) => {
  const id = formData.get("id") as string

  if (!id) {
    throw new Error("Invalid user id");
  }

  try {
    await db.technology.update({
      where: {
        id: parseInt(id)
      }, data: {
        deletedAt: new Date()
      }
    })
    revalidatePath("/dashboard/technology");
  } catch (error) {
    throw new Error(`Failed to delete user ${error}`);
  }
}

export const CreateTechnology = async (formData: FormData) => {
  const image = formData.get("images") as File;
  const tech = formData.get("tech") as string;

  if (!image || !(image instanceof File)) {
    throw new Error("Invalid or missing image file in formData.");
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "technology", allowed_formats: ["heic", "gif", "jpg", "png", "webp", "mp4"] },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result?.url);
        }
      ).end(buffer);
    });

    await db.technology.create({
      data: {
        tech,
        images: result as string,
      },
    });

    revalidatePath("/dashboard/technology");
  } catch (error) {
    console.error("Error creating technology:", error);
    throw new Error(`Failed to create technology: ${error}`);
  } finally {
    redirect("/dashboard/technology");
  }
};
