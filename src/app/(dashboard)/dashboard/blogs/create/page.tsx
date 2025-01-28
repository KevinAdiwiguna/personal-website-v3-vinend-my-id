import React from "react";

// Form
import { BlogCreateForm } from "./create-form";

// Components
import { Breadcrumb } from "@/components/atoms/bread-crumb";

// Actions
import { GetAllTag } from "@/actions/tag-action";
import { GetAllTechnology } from "@/actions/technology-action";

interface searchParamsProps {
  page?: string;
  query?: string;
}

const page = async ({ searchParams }: { searchParams: Promise<searchParamsProps> }) => {
  const { page, query } = await searchParams;
  const defaultQuery = query || "";
  const defaultPages = parseInt(page || "1");

  const getTag = await GetAllTag({ query: defaultQuery, page: defaultPages });
  const getTech = await GetAllTechnology({ query: defaultQuery, page: defaultPages });

  const tagData = getTag.data || [];
  const techData = getTech.data || [];
  return (
    <>
      <Breadcrumb />
      <h1 className="my-4 text-2xl font-bold">Create Blogs</h1>
      <BlogCreateForm tagData={tagData} techData={techData} />
    </>
  );
};

export default page;
