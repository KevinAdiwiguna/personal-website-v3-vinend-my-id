"use client"

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { VscThreeBars } from "react-icons/vsc";

import { ActionButton } from "../atoms/button";
import { cn } from "@/lib/cn";

interface SidebarProps {
  className?: string;
  useRemoteWork?: boolean;
}


export const Sidebar = ({ useRemoteWork = false, className }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
		<>
			<nav className={cn("flex w-full pt-1 z-50", useRemoteWork ? "justify-between items-center" : "justify-end", className)}>
				{useRemoteWork && (
					<div id="about" className="w-full border-b border-neutral-800 py-4 md:p-8">
						<section className="flex w-fit items-center gap-2 rounded-full border border-neutral-500  px-4 py-2">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
								<span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
							</span>
							<h1 className="text-xs md:text-sm">Available For Remote Work</h1>
						</section>
					</div>
				)}
				<ActionButton onClick={toggleSidebar} className="lg:hidden">
					<VscThreeBars size={25} />
				</ActionButton>
			</nav>

			<nav className={cn("h-screen w-full top-0 left-0 right-0 bottom-0 fixed bg-neutral-800 z-50", isOpen ? "block" : "hidden")}>
				<div className="w-full pt-1 flex justify-end">
					<ActionButton onClick={toggleSidebar}>
						<IoMdClose size={25} />
					</ActionButton>
				</div>

				<ul className="w-full text-center h-[80vh] flex flex-col items-center justify-center gap-y-5 text-2xl font-semibold">
					<li>
						<ActionButton to="/" className="rounded hover:text-cyan-400 transition duration-200" onClick={toggleSidebar}>
							Home
						</ActionButton>
					</li>
					<li>
						<ActionButton to="/blogs" className="rounded hover:text-cyan-400 transition duration-200" onClick={toggleSidebar}>
							Blogs
						</ActionButton>
					</li>
					<li>
						<ActionButton to="/projects" className="rounded hover:text-cyan-400 transition duration-200" onClick={toggleSidebar}>
							Projects
						</ActionButton>
					</li>
				</ul>
			</nav>
		</>
	);
}
