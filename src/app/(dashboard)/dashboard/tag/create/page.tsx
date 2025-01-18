import { Breadcrumb } from '@/components/atoms/bread-crumb';
import { ActionButton } from '@/components/atoms/button';
import { InputWithLabel } from '@/components/atoms/input-with-label';
import React from 'react';


import { CreateTag } from '@/actions/tag-action'

const page = () => {
  return (
    <>
      <Breadcrumb />
      <h1 className="my-4 text-2xl font-bold">Create Tag</h1>

      <form className="space-y-4 max-w-lg mx-auto" action={CreateTag}>
        <InputWithLabel
          required
          label="Tag Name"
          type="text"
          name="tag"
          id="tag"
        />
        <ActionButton
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 py-2 w-full"
        >
          Create
        </ActionButton>
      </form>
    </>
  );
};

export default page;
