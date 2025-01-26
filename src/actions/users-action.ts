"use server"

import { db } from "@/db/db"
import { ITEMS_PER_PAGE, QueryParamsProps, ResponseState } from "@/types/globals"
import { revalidatePath } from "next/cache"

export const GetAllUser = async ({ query, page }: QueryParamsProps) => {
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
  
    return {
      status: 200,
      message: "User fetched successfully",
      data: users,
      timeStamp: new Date()
    }
  } catch (error) {
    return {
      stauts: 500,
      message: `Failed to fetch user ${error}`,
      timeStamp: new Date()
    }
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

export const DeleteUserByUUID = async (previousState: unknown, formData: FormData): Promise<ResponseState> =>  {
  const id = formData.get("id")
  try {
    await db.user.delete({
      where: {
        id: id?.toString()
      }
    })

    return {
      status: 200,
      message: "User deleted successfully",
      timeStamp: new Date()
    }
  } catch (error) {
    return {
      status: 500,
      message: `Failed to delete user ${error}`,
      timeStamp: new Date()
    }
  } finally {
    revalidatePath("/dashboard/users");
  }
}