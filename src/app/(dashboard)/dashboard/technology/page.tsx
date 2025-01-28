import React from 'react'

// Components
import Search from '@/components/organisms/search'
import Pagination from '@/components/organisms/pagination'
import { Breadcrumb } from '@/components/atoms/bread-crumb'
import { ActionButton, DeleteButton } from '@/components/atoms/button'


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

  const fetchTech = await GetAllTechnology({ query: defaultQuery, page: defaultPages })
  const techData = fetchTech.data
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
          {techData && techData.map((tech) => {
            return (
              <tr key={tech.id} className="bg-neutral-800 border-b">
                <td className="py-3 px-6">{tech.id}</td>
                <td className="py-3 px-6">{tech.tech}</td>
                <td className="py-3 px-6"><ActionButton className='basic-link' to={tech.images || ""}>{tech.images ? "Tech Images" : "Null"}</ActionButton>  </td>
                <td className="flex justify-center gap-1 py-3">
                  <DeleteButton id={tech.id.toString()} actions={DeleteUTechnologyByID} />
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