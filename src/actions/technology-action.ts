"use server";

import { db } from "@/db/db";
import { revalidatePath } from "next/cache";

import cloudinary from "@/lib/cloudinary";
import { ITEMS_PER_PAGE, QueryParamsProps, ResponseState } from "@/types/globals";

export const GetAllTechnology = async ({ query, page }: QueryParamsProps) => {
  const offest = (page - 1) * ITEMS_PER_PAGE;

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
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return {
      status: 200,
      message: "Technology fetched successfully",
      data: users,
      timeStamp: new Date(),
    };
  } catch (error) {
    return {
      stauts: 500,
      message: `Failed to fetch technology ${error}`,
      timeStamp: new Date(),
    };
  }
};

export const GetTechnologyByCount = async (query: string) => {
  const user = await db.technology.count({
    where: {
      deletedAt: null,
      OR: [
        {
          tech: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  const totalPages = Math.ceil(Number(user) / ITEMS_PER_PAGE);
  return totalPages;
};

export const DeleteUTechnologyByID = async (previousState: unknown, formData: FormData): Promise<ResponseState> => {
  const id = formData.get("id") as string;

  if (!id || isNaN(parseInt(id))) {
    return {
      status: 400,
      message: "Invalid user id",
      timeStamp: new Date(),
    };
  }

  try {
    await db.technology.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return {
      status: 200,
      message: "Technology deleted successfully",
      timeStamp: new Date(),
    };
  } catch (error) {
    return {
      status: 500,
      message: `Failed to delete technology ${error}`,
      timeStamp: new Date(),
    };
  } finally {
    revalidatePath("/dashboard/technology");
  }
};

export const CreateTechnology = async (previousState: unknown, formData: FormData): Promise<ResponseState> => {
  const image = formData.get("images") as File;
  const tech = formData.get("tech") as string;

  if (!image) {
    return {
      status: 400,
      message: "Invalid or missing image file in formData.",
      timeStamp: new Date(),
    }
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "technology", allowed_formats: ["heic", "gif", "jpg", "png", "webp", "mp4"] },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(result?.url);
          }
        )
        .end(buffer);
    });

    await db.technology.create({
      data: {
        tech,
        images: result as string,
      },
    });

    return {
      status: 201,
      message: "Technology created successfully",
      timeStamp: new Date(),
    };

  } catch (error) {
    return {
      status: 500,
      message: `Failed to create technology ${error}`,
      timeStamp: new Date(),
    };
  } finally {
    revalidatePath("/dashboard/technology");
  }
};