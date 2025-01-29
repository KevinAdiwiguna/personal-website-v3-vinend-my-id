"use client";

import { useState, useActionState, startTransition, useEffect } from "react";
import { useRouter, useSearchParams, usePathname, redirect } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Image from "next/image";
import dynamic from "next/dynamic";


import { ActionButton } from "@/components/atoms/button";
import { InputWithLabel } from "@/components/atoms/input-with-label";
const Editor = dynamic(() => import("@/components/template/editor/editor"), { ssr: false });

import { CreateBlog } from "@/actions/blogs-action";
import { toast } from "react-toastify";

interface TagsProps {
  id: number;
  tag: string;
  deletedAt: null | Date;
}

interface TechProps {
  id: number;
  tech: string;
  images: string;
}

interface AllProps {
  techData: TechProps[];
  tagData: TagsProps[];
}
export const BlogCreateForm = ({ tagData, techData }: AllProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleTagSearch = (query: string) => {
    return tagData.filter((tag) => tag.tag.toLowerCase().includes(query.toLowerCase()));
  };

  const handleTechSearch = (query: string) => {
    return techData.filter((tech) => tech.tech.toLowerCase().includes(query.toLowerCase()));
  };

  const handleDeleteTag = (id: number) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== id));
  };

  const handleDeleteTech = (id: number) => {
    setSelectedTech(selectedTech.filter((tech) => tech.id !== id));
  };

  const [state, action, isPending] = useActionState(CreateBlog, null)

  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<TagsProps[]>([]);
  const [selectedTech, setSelectedTech] = useState<TechProps[]>([]);

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if (image) formData.append("images", image);

    selectedTags.forEach((tag) => {
      formData.append("tags", String(tag.id));
    });

    selectedTech.forEach((tech) => {
      formData.append("tech", String(tech.id));
    });


    startTransition(() => {
      action(formData);
    })

  };

  useEffect(() => {
    if (state?.status === 201) {
      toast.success(state.message);
      redirect('/dashboard/blogs');
    }
    if (state?.status === 400 || state?.status === 500) {
      toast.error(state.message);
    }
}, [state?.status, state?.message, state?.timeStamp]);


  return (
    <form className="space-y-4 mx-auto" onSubmit={(e) => e.preventDefault()}>
      <div className="font-[sans-serif] mx-auto text-white">
        <label className="text-base text-gray-500 font-semibold mb-2 block">Upload file</label>
        <input
          required
          type="file"
          name="images"
          id="images"
          className="w-full text-gray-400 font-semibold text-sm bg-slate-800 border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} // Simpan file ke state
        />
        <p className="text-xs text-gray-400 mt-2">PNG, JPG, WEBP, and GIF are Allowed.</p>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-x-4">
        <InputWithLabel
          required
          label="Title"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
        <InputWithLabel
          required
          label="Description"
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="text-base text-gray-500 font-semibold mb-2 block">Tags</label>
        <input
          type="text"
          placeholder="Search tags..."
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {handleTagSearch(searchParams.get("query") || "").map((tag) => (
            <span
              key={tag.id}
              onClick={() => {
                if (!selectedTags.some((selected) => selected.id === tag.id)) {
                  setSelectedTags([...selectedTags, tag]);
                }
              }}
              className="bg-gray-200 text-black py-1 px-2 rounded cursor-pointer hover:bg-gray-300"
            >
              {tag.tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span key={tag.id} className="flex items-center gap-2 bg-blue-600 text-white py-1 px-2 rounded">
              {tag.tag}
              <button
                onClick={() => handleDeleteTag(tag.id)}
                className="text-red-500 font-bold ml-2 hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="text-base text-gray-500 font-semibold mb-2 block">Technologies</label>
        <input
          type="text"
          placeholder="Search technologies..."
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {handleTechSearch(searchParams.get("query") || "").map((tech) => (
            <span
              key={tech.id}
              onClick={() => {
                if (!selectedTech.some((selected) => selected.id === tech.id)) {
                  setSelectedTech([...selectedTech, tech]);
                }
              }}
              className="flex items-center gap-2 bg-gray-200 text-black py-1 px-2 rounded cursor-pointer hover:bg-gray-300"
            >
              <Image width={10} height={10} src={tech.images} alt={tech.tech} className="w-5 h-5" />
              {tech.tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedTech.map((tech) => (
            <span key={tech.id} className="flex items-center gap-2 bg-blue-600 text-white py-1 px-2 rounded">
              <Image width={10} height={10} src={tech.images} alt={tech.tech} className="w-5 h-5" />
              {tech.tech}
              <button
                onClick={() => handleDeleteTech(tech.id)}
                className="text-red-500 font-bold ml-2 hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <Editor setContent={setContent} />

      <ActionButton
        type="submit"
        disabled={title == "" || description == "" || content == "" || !image || isPending}
        className="bg-blue-500 hover:bg-blue-700 py-2 w-full"
        onClick={handleSubmit}
      >
        Create
      </ActionButton>
    </form>
  );
};
