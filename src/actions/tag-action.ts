"use server"

import { db } from "@/db/db"
import { revalidatePath } from "next/cache"

import {ITEMS_PER_PAGE, QueryParamsProps, ResponseState}from '@/types/globals'

export const GetAllTag = async ({ query, page }: QueryParamsProps) => {
  const offest = (page - 1) * ITEMS_PER_PAGE

  try {
    const users = await db.tag.findMany({
      skip: offest,
      take: ITEMS_PER_PAGE,
      where: {
        deletedAt: null,
        OR: [
          {
            tag: {
              contains: query,
              mode: "insensitive"
            }
          },
        ]
      }
    })
    return {
      status: 200,
      message: "Tag fetched successfully",
      data: users,
      timeStamp: new Date(),
    }
  } catch (error) {
    return {
      stauts: 500,
      message: `Failed to fetch tag ${error}`,
      timeStamp: new Date(),
    }
  }

}

export const GetTagByCount = async (query: string) => {
  const user = await db.tag.count({
    where: {
      deletedAt: null,
      OR: [
        {
          tag: {
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

export const DeleteTagByID = async (formData: FormData) => {
  const id = formData.get("id") as string
  if (!id || isNaN(parseInt(id))) {
    throw new Error("Invalid user id");
  }

  try {
    await db.tag.update({
      where: {
        id: parseInt(id)
      }, data: {
        deletedAt: new Date()
      }
    })
    return {
      status: 200,
      message: "Tag deleted successfully",
      timeStamp: new Date(),
    }
  } catch (error) {
    return {
      stauts: 500,
      message: `Failed to delete tag ${error}`,
      timeStamp: new Date(),
    }
  } finally {
    revalidatePath("/dashboard/tag");
  }
}

export const CreateTag =  async (previousState: unknown, formData: FormData): Promise<ResponseState>  => {
  const tag = formData.get("tag") as string
  if (!tag || typeof tag == 'string') {
    return {
      status: 400,
      message: "Invalid tag data type",
      timeStamp: new Date(),
    }
  }

  try {
    await db.tag.create({
      data: {
        tag: tag
      }
    })
    return {
      status: 200,
      message: "Tag created successfully",
      timeStamp: new Date(),
    }
  } catch (error) {
    return {
      status: 500,
      message: `Failed to create tag ${error}`,
      timeStamp: new Date(),
    }
  } finally {
    revalidatePath("/dashboard/tag");
  }
}