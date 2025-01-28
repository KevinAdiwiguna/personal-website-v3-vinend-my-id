import React from 'react'

import { Breadcrumb } from '@/components/atoms/bread-crumb'
import Pagination from '@/components/organisms/pagination'
import { ActionButton, DeleteButton } from '@/components/atoms/button'
import Search from '@/components/organisms/search'



// Actions
import { GetAllProject, GetProjectByCount, DeleteProject } from '@/actions/project-action'

// Libs
import { formatDate } from '@/lib/format-date'

interface searchParamsProps {
  page?: string
  query?: string
}

const page = async ({ searchParams }: { searchParams: Promise<searchParamsProps> }) => {
  const { page, query } = await searchParams
  const defaultQuery = query || ''
  const defaultPages = parseInt(page || '1')

  // Untuk Pagination
  const totalCount = await GetProjectByCount(defaultQuery)

  // Untuk Get data user
  const fetchProject = await GetAllProject({ query: defaultQuery, page: defaultPages })
  
  const projectData = fetchProject.data
  return (
    <>
      <Breadcrumb />
      <h1 className='my-4 text-2xl font-bold'>List Project</h1>
      <div className='flex justify-center items-end gap-x-2 mt-6 my-10'>
        <Search />
        <ActionButton to='/dashboard/projects/create' className='bg-blue-500 hover:bg-blue-700 py-2'>Create</ActionButton>
      </div>
      <table className="w-full overflow-x-scroll text-sm text-left">
        <thead className="text-sm bg-neutral-700">
          <tr>
            <th className="py-3 px-6">ID</th>
            <th className="py-3 px-6">Title</th>
            <th className="py-3 px-6">Description</th>
            <th className="py-3 px-6">Update At</th>
            <th className="py-3 px-6">Author</th>
            <th className="py-3 px-6">Image</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectData && projectData.map((project) => {
            return (
              <tr key={project.id} className="bg-neutral-800 border-b">
                <td className="py-3 px-6">{project.id}</td>
                <td className="py-3 px-6">{project.title}</td>
                <td className="py-3 px-6">{project.description}</td>
                <td className="py-3 px-6">{formatDate(project.updatedAt.toString())}</td>
                <td className="py-3 px-6">{project.user.name}</td>
                <td className="py-3 px-6"><ActionButton className='basic-link' to={project.thumbnail || ""}>{project.thumbnail ? "Profile Picture" : "Null"}</ActionButton>  </td>
                <td className="flex justify-center gap-1 py-3">
                  <DeleteButton id={project.id.toString()} actions={DeleteProject}/>
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