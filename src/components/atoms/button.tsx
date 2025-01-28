"use client";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/cn";
import { useFormStatus } from "react-dom";

interface ActionButtonProps {
  children?: React.ReactNode;
  to?: string;
  tooltip?: string;
  onClick?: () => void;
  className?: string;
  rel?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  download?: string;
  name?: string;
  value?: string;
}

export const ActionButton = ({
  children,
  to,
  tooltip,
  target,
  download,
  onClick,
  rightIcon,
  rel,
  className = "",
  name,
  value,
  leftIcon,
  type = "button",
  disabled = false,
}: ActionButtonProps) => {
  const { pending } = useFormStatus();

  const computedClassName = cn(
    "gap-2 px-3 py-3 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed",
    className
  );

  const buttonContent = (
    <>
      {leftIcon && <span className="icon">{leftIcon}</span>}
      {children && <span className="content">{children}</span>}
      {rightIcon && <span className="icon">{rightIcon}</span>}
    </>
  );

  if (to) {
    return (
      <Link href={to} title={tooltip} target={target} className={computedClassName} rel={rel}>
        {buttonContent}
      </Link>
    );
  } else if (download) {
    return (
      <Link title={tooltip} href={to!} download={download} rel={rel} target={target} className={computedClassName}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      title={tooltip}
      type={type}
      onClick={onClick}
      disabled={disabled || pending}
      name={name}
      value={value}
      rel={rel}
      className={computedClassName}
    >
      {buttonContent}
    </button>
  );
};

import { ResponseState } from "@/types/globals";
import { useActionState, useEffect } from "react";

import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";

export const DeleteButton = ({
  id,
  actions,
}: {
  id: string;
  actions: (previousState: unknown, formData: FormData) => Promise<ResponseState>;
}) => {
  const [state, action, isPending] = useActionState(actions, null);

  useEffect(() => {
    if (state?.status == 200) {
      console.log("gugu gaga gugug gaga");
      toast.success(state.message);
    }
    if (state?.status == 400) {
      console.log("gugu gaga gugug gaga");
      toast.error(state.message);
    }
    if (state?.status == 500) {
      console.log("gugu gaga gugug gaga");
      toast.error(state.message);
    }
  }, [state?.timeStamp]);


  console.log("state => ", state)
  console.log("isPending => ", isPending)

  return (
    <form action={action}>
      <input type="text" name="id" defaultValue={id} hidden />
      <ActionButton
        disabled={isPending}
        type="submit"
        className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
        leftIcon={<BiTrash className="text-xl" />}
      />
    </form>
  );
};
