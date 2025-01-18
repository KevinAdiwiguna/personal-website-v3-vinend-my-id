import { Breadcrumb } from '@/components/atoms/bread-crumb';
import { ActionButton } from '@/components/atoms/button';
import { InputWithLabel } from '@/components/atoms/input-with-label';
import React from 'react';


import { CreateTechnology } from '@/actions/technology-action'

const page = () => {
  return (
    <>
      <Breadcrumb />
      <h1 className="my-4 text-2xl font-bold">Create Technology</h1>

      <form className="space-y-4 max-w-lg mx-auto" action={CreateTechnology}>
        <InputWithLabel
          required
          label="Tech Name"
          type="text"
          name="tech"
          id="tech"
        />

        <div className="font-[sans-serif] mx-auto text-white">
          <label className="text-base text-gray-500 font-semibold mb-2 block ">Upload file</label>
          <input required type="file" name="images" id="images"
            className="w-full text-gray-400 font-semibold text-sm bg-slate-800 border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" />
          <p className="text-xs text-gray-400 mt-2">PNG, JPG, WEBP, and GIF are Allowed.</p>
        </div>

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
