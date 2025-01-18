"use server"

import { db } from "@/db/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


interface GetAllTagProps {
  query: string
  page: number
}

const ITEMS_PER_PAGE = 15

export const GetAllTag = async ({ query, page }: GetAllTagProps) => {
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
          {

          }
        ]
      }
    })
    return users
  } catch (error) {
    throw new Error(`Failed to fetch contact data ${error}`);
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
  if (!id) {
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
    revalidatePath("/dashboard/tag");
  } catch (error) {
    throw new Error(`Failed to delete user ${error}`);
  }
}

export const CreateTag = async (formData: FormData) => {
  const tag = formData.get("tag") as string
  if (!tag) {
    throw new Error("Invalid tag");
  }

  try {
    await db.tag.create({
      data: {
        tag: tag
      }
    })
    revalidatePath("/dashboard/tag");
  } catch (error) {
    throw new Error(`Failed to create tag ${error}`);
  } finally {
    redirect("/dashboard/tag");
  }
}