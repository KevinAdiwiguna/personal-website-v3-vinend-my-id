"use client"
import React, { useActionState, useEffect } from "react";
import { redirect } from "next/navigation";

import { toast } from "react-toastify";

import { ActionButton } from "@/components/atoms/button";
import { InputWithLabel } from "@/components/atoms/input-with-label";

import { CreateTag } from "@/actions/tag-action";

export const CreateForm = () => {
    const [state, action, isPending] = useActionState(CreateTag, null)
  
  useEffect(() => {
    if (state?.status === 201) {
      toast.success(state.message);
      redirect('/dashboard/tag');
    }
    if (state?.status === 400 || state?.status === 500) {
      toast.error(state.message);
    }
}, [state?.status, state?.message, state?.timeStamp]);

    return (
        <form className="space-y-4 max-w-lg mx-auto" action={action}>
        <InputWithLabel required label="Tag Name" type="text" name="tag" id="tag" />
        <ActionButton type="submit" className="bg-blue-500 hover:bg-blue-700 py-2 w-full" disabled={isPending}>
          Create
        </ActionButton>
      </form>
    )
}