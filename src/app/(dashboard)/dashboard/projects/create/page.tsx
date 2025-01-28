import React from 'react';

// Form
import { ProjectCreateForm } from './create-form';

// Components
import { Breadcrumb } from '@/components/atoms/bread-crumb';

// Actions
import { GetAllTag } from '@/actions/tag-action';
import { GetAllTechnology } from '@/actions/technology-action'

interface searchParamsProps {
  page?: string
  query?: string
}

const page = async ({ searchParams }: { searchParams: Promise<searchParamsProps> }) => {
  const { page, query } = await searchParams
  const defaultQuery = query || ''
  const defaultPages = parseInt(page || '1')

  const fetchTag = await GetAllTag({ query: defaultQuery, page: defaultPages })
  const fetchTech = await GetAllTechnology({ query: defaultQuery, page: defaultPages })

  const tagData = fetchTag.data || []
  const techData = fetchTech.data || []

  return (
    <>
      <Breadcrumb />
      <h1 className="my-4 text-2xl font-bold">Create Projects</h1>
      <ProjectCreateForm tagData={tagData} techData={techData} />
    </>
  );
};

export default page;
