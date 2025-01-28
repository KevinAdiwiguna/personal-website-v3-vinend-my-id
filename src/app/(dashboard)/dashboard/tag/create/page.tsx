"use client"

import React, { useActionState, useEffect } from "react";

import { Breadcrumb } from "@/components/atoms/bread-crumb";
import { ActionButton } from "@/components/atoms/button";
import { InputWithLabel } from "@/components/atoms/input-with-label";

import { CreateTag } from "@/actions/tag-action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const page = () => {
  const [state, action, isPending] = useActionState(CreateTag, null)
  const router = useRouter();

  useEffect(() => {
    if (state?.status == 201) {
      toast.success(state.message);
      router.push('/dashboard/tag')
      
    }
    if (state?.status == 400) {
      toast.error(state.message);
    }
    if (state?.status == 500) {
      toast.error(state.message);
    }

  }, [state?.timeStamp])
  return (
    <>
      <Breadcrumb />
      <h1 className="my-4 text-2xl font-bold">Create Tag</h1>

      <form className="space-y-4 max-w-lg mx-auto" action={action}>
        <InputWithLabel required label="Tag Name" type="text" name="tag" id="tag" />
        <ActionButton type="submit" className="bg-blue-500 hover:bg-blue-700 py-2 w-full" disabled={isPending}>
          Create
        </ActionButton>
      </form>
    </>
  );
};

export default page;
