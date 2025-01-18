"use server"

import { db } from "@/db/db"
import { revalidatePath } from "next/cache"


interface GetAllUserProps {
  query: string
  page: number
}

const ITEMS_PER_PAGE = 15

export const GetAllUser = async ({ query, page }: GetAllUserProps) => {
  const offest = (page - 1) * ITEMS_PER_PAGE

  try {
    const users = await db.user.findMany({
      skip: offest,
      take: ITEMS_PER_PAGE,
      where: {
        deletedAt: null,
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive"
            }
          },
          {
            email: {
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

export const GetUserByCount = async (query: string) => {
  const user = await db.user.count({
    where: {
      deletedAt: null,
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive"
          }
        },
        {
          email: {
            contains: query,
            mode: "insensitive"
          }
        },
        {
          role: {
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

export const DeleteUserByUUID = async (formData: FormData) => {
  const id = formData.get("id")
  try {
    await db.user.delete({
      where: {
        id: id?.toString()
      }
    })
    revalidatePath("/dashboard/users");
  } catch (error) {
    throw new Error(`Failed to delete user ${error}`);
  }
}