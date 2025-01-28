import React from 'react'

// Components
import { Breadcrumb } from '@/components/atoms/bread-crumb'
import { ActionButton } from '@/components/atoms/button'
import { DeleteButton } from '@/components/atoms/button'
import Search from '@/components/organisms/search'
import Pagination from '@/components/organisms/pagination'


// lib
import { formatDate } from '@/lib/format-date'

// Actions
import { GetAllUser, GetUserByCount, DeleteUserByUUID } from '@/actions/users-action'

// Interface
interface searchParamsProps {
  page?: string
  query?: string
}

const page = async ({ searchParams }: { searchParams: Promise<searchParamsProps> }) => {
  const { page, query } = await searchParams
  const defaultQuery = query || ''
  const defaultPages = parseInt(page || '1')

  const totalCount = await GetUserByCount(defaultQuery)

  const fetchUser = await GetAllUser({ query: defaultQuery, page: defaultPages })

  const getUserData = fetchUser.data

  return (
    <>
      <Breadcrumb />
      <h1 className='my-4 text-2xl font-bold'>List User</h1>
      <div className='mt-6 my-10'>
        <Search />
      </div>
      <table className="w-full overflow-x-scroll text-sm text-left">
        <thead className="text-sm bg-neutral-700">
          <tr>
            <th className="py-3 px-6">ID</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Role</th>
            <th className="py-3 px-6">Image</th>
            <th className="py-3 px-6">updatedAt</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {getUserData && getUserData.map((user) => {
            return (
              <tr key={user.id} className="bg-neutral-800 border-b">
                <td className="py-3 px-6">{user.id}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6"><ActionButton className='basic-link' to={user.image || ""}>{user.image ? "Profile Picture" : "Null"}</ActionButton>  </td>
                <td className="py-3 px-6">{formatDate(user.updatedAt.toString())}</td>
                <td className="flex justify-center gap-1 py-3">
                <DeleteButton id={user.id.toString()} actions={DeleteUserByUUID}/>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table >

      <div className='mt-12 text-center'>
        <Pagination totalCount={totalCount} />
      </div>
    </>
  )
}

export default page