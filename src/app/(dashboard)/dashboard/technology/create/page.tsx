"use client"

import React from "react";

import { Breadcrumb } from "@/components/atoms/bread-crumb";
import { CreateForm } from "./create-form";

const page = () => {
  return (
    <>
      <Breadcrumb />
      <h1 className="my-4 text-2xl font-bold">Create Technology</h1>
     <CreateForm />
    </>
  );
};

export default page;
