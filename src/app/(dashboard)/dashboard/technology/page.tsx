import React from 'react'

// Components
import Search from '@/components/organisms/search'
import Pagination from '@/components/organisms/pagination'
import { Breadcrumb } from '@/components/atoms/bread-crumb'
import { ActionButton } from '@/components/atoms/button'

// Icons
import { BiTrash } from 'react-icons/bi'

// Actions
import { DeleteUTechnologyByID, GetAllTechnology, GetTechnologyByCount } from '@/actions/technology-action'


interface searchParamsProps {
  page?: string
  query?: string
}

const page = async ({ searchParams }: { searchParams: Promise<searchParamsProps> }) => {
  const { page, query } = await searchParams
  const defaultQuery = query || ''
  const defaultPages = parseInt(page || '1')

  const totalCount = await GetTechnologyByCount(defaultQuery)

  const getTech = await GetAllTechnology({ query: defaultQuery, page: defaultPages })
  return (
    <>
      <Breadcrumb />
      <h1 className='my-4 text-2xl font-bold'>List Technology</h1>
      <div className='flex justify-center items-end gap-x-2 mt-6 my-10'>
        <Search />
        <ActionButton to='/dashboard/technology/create' className='bg-blue-500 hover:bg-blue-700 py-2'>Create</ActionButton>
      </div>
      <table className="w-full overflow-x-scroll text-sm text-left">
        <thead className="text-sm bg-neutral-700">
          <tr>
            <th className="py-3 px-6">ID</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Image</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {getTech.map((tech) => {
            return (
              <tr key={tech.id} className="bg-neutral-800 border-b">
                <td className="py-3 px-6">{tech.id}</td>
                <td className="py-3 px-6">{tech.tech}</td>
                <td className="py-3 px-6"><ActionButton className='basic-link' to={tech.images || ""}>{tech.images ? "Tech Images" : "Null"}</ActionButton>  </td>
                <td className="flex justify-center gap-1 py-3">
                  <form action={DeleteUTechnologyByID}>
                    <input type="text" name="id" defaultValue={tech.id.toString()} hidden />
                    <ActionButton
                      type='submit'
                      className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
                      leftIcon={<BiTrash className='text-xl' />} />
                  </form>
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