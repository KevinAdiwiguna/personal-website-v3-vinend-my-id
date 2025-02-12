import React from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import "@/styles/blocknotes-styles.css";

import parse from 'html-react-parser';

import { Breadcrumb } from '@/components/atoms/bread-crumb';

import { formatDate } from '@/lib/format-date'

import { GetBlogByID } from '@/actions/blogs-action'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fetchBlogById = await GetBlogByID(id.toString());
  const blogData = fetchBlogById.data;

  if (!blogData) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: blogData.title,
    description: blogData.description,
    openGraph: {
      title: blogData.title,
      description: blogData.description,
      images: [
        {
          url: blogData.images,
          width: 800,
          height: 600,
          alt: blogData.title,
        },
      ],
    },
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const fetchBlogById = await GetBlogByID(id.toString())
  const blogData = fetchBlogById.data

  if(!blogData) {
    redirect('/404')
  }
  return (
    <div>
      <Breadcrumb />
      <div className='w-full h-fit mx-auto flex justify-center items-center mt-8'>
        <Image src={blogData.images} alt={blogData.title} width={1920 / 3} height={1080 / 3} className='block' />
      </div>
      <div className='flex justify-around items-center mt-8'>
        <div className='flex gap-x-2 items-center'>
          <Image src={blogData.user.image || "https://cdn.fakercloud.com/avatars"} alt={blogData.user.name || blogData.user.email} width={50} height={50} className='rounded-full' />
          <div>
            <p className='text-lg'>{blogData.user.name}</p>
            <span className='text-sm text-neutral-400'>{formatDate(blogData.updatedAt.toString())}</span>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex gap-1 items-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 576 512"
              height="14"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path>
            </svg>
            <span className="text-xs font-medium ml-0.5">{blogData.viewCount | 0}</span>
          </div>
        </div>
      </div>

      <div className='mt-24'>
        <h1 className='text-3xl font-bold mt-8 mb-2'>{blogData.title}</h1>
        <p className='text-xl mb-16'>{blogData.description}</p>
        <div className='prose dark:prose-invert lg:prose-xl'>
          {parse(blogData?.content || '')}
        </div>
      </div>

      <div className='flex max-w-lg gap-x-4 gap-y-2'>
        {blogData.tags.length > 0 && blogData.tags.map((tag) => {
          return (
            <div
              key={tag.tag?.id}
              className="px-2.5 py-1 rounded-full font-mono text-base dark:bg-neutral-700/50 dark:text-neutral-400 text-white bg-neutral-900/50 w-fit">
              <span className="font-semibold mr-1">#</span>
              {tag?.tag?.tag}
            </div>
          )
        }
        )}
      </div>
    </div>
  )
}

export default page