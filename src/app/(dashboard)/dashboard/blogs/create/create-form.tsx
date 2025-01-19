"use client";
import { ActionButton } from '@/components/atoms/button';
import { InputWithLabel } from '@/components/atoms/input-with-label';
const Editor = dynamic(() => import("@/components/template/editor/editor"), { ssr: false });
import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { CreateBlog } from '@/actions/blogs-action';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useFormStatus } from 'react-dom';

interface getTagProps {
  id: number;
  tag: string;
}
interface getTechProps {
  id: number;
  images: string;
  tech: string;
}

export const BlogCreateForm = ({ getTag, getTech }: { getTag: getTagProps[]; getTech: getTechProps[] }) => {
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null); // Untuk menyimpan file gambar
  const [selectedTags, setSelectedTags] = useState<getTagProps[]>([]);
  const [selectedTech, setSelectedTech] = useState<getTechProps[]>([]);

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
    return getTag.filter((tag) => tag.tag.toLowerCase().includes(query.toLowerCase()));
  };

  const handleTechSearch = (query: string) => {
    return getTech.filter((tech) => tech.tech.toLowerCase().includes(query.toLowerCase()));
  };

  const handleDeleteTag = (id: number) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== id));
  };

  const handleDeleteTech = (id: number) => {
    setSelectedTech(selectedTech.filter((tech) => tech.id !== id));
  };

  const { pending } = useFormStatus();
  const handleSubmit = () => {
    const formData = new FormData();
    if (image) formData.append("images", image); // Masukkan file gambar dari state
    formData.append("title", title); // Masukkan title dari state
    formData.append("description", description); // Masukkan description dari state
    formData.append("content", content);

    selectedTags.forEach((tag) => {
      formData.append("tags", String(tag.id));
    });

    selectedTech.forEach((tech) => {
      formData.append("tech", String(tech.id));
    });


    CreateBlog(formData)
  };

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
          onChange={(e) => setTitle(e.target.value)} // Simpan nilai ke state
        />
        <InputWithLabel
          required
          label="Description"
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Simpan nilai ke state
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
        disabled={title == "" || description == "" || content == "" || !image || pending}
        className="bg-blue-500 hover:bg-blue-700 py-2 w-full"
        onClick={handleSubmit} // Panggil handleSubmit saat klik
      >
        Create
      </ActionButton>
    </form>
  );
};