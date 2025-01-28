import { GetNewProject } from "@/actions/project-action"
import { ActionButton } from "../atoms/button"
import Image from "next/image"
import { formatDate } from "@/lib/format-date"
import { FaAngleRight, FaBloggerB } from "react-icons/fa"

export const ProjectSection = async () => {
  const getProject = await GetNewProject(2)
  const dataProject = getProject.data
  return (
    <>
      {dataProject && dataProject?.length > 0 && (
        <div className="mt-16 md:mt-20" id="blogs">
          <section className="border-b border-neutral-800 pb-6 border-dashed">
            <div className="font-bold flex gap-2 items-center">
              <FaBloggerB className="text-2xl" />
              <h1 className="text-2xl">My Project</h1>
            </div>
            <div className="basic-description-color mt-2">
              My project is a place where I share my thoughts, ideas, and experiences. I write
            </div>
          </section>
          <div className='md:grid md:grid-cols-2'>
            {dataProject.map((res) => {
              return (
                <ActionButton key={res.id} to={`/blogs/${res.id.toString()}`}>
                  <div className="mb-5 bg-[#1E1E1E] rounded-xl transition-all duration-300 shadow-sm group relative flex flex-col border dark:border-neutral-800 h-[400px] w-full">
                    <div className="duration-500 relative rounded-xl" style={{ height: 400, overflow: "hidden" }}>
                      <div style={{ height: 400, overflow: "hidden" }}>
                        <Image
                          alt={res.title}
                          loading="lazy"
                          width={10000}
                          height={10000}
                          className="duration-700 ease-in-out scale-100 blur-0 grayscale-0 w-full h-full transform transition-transform group-hover:scale-105 group-hover:blur-sm"
                          src={res.thumbnail}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black opacity-80 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute flex flex-col justify-between p-5 space-y-4 h-full w-full">
                      <div className="flex flex-wrap gap-2">
                        {res?.technologies?.length > 0 && res.technologies.map((tech) => {
                          return (
                            <Image
                              width={25}
                              height={25}
                              alt={tech.technology?.tech || ""}
                              key={tech.technology?.id}
                              className="px-1"
                              src={tech.technology?.images || ""} />
                          )
                        })}
                      </div>
                      <div className="flex flex-col justify-end">
                        <div className="flex flex-col space-y-3">
                          <h3 className="font-sora text-lg font-medium text-neutral-100 group-hover:underline group-hover:underline-offset-4">
                            {res.title}
                          </h3>
                          <div className="flex gap-1 items-center text-neutral-400">
                            <svg
                              stroke="currentColor"
                              fill="none"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              height="14"
                              width="14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                              <path d="M13.5 21h-7.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5"></path>
                              <path d="M16 3v4"></path>
                              <path d="M8 3v4"></path>
                              <path d="M4 11h16"></path>
                              <path d="M19 16l-2 3h4l-2 3"></path>
                            </svg>
                            <span className="text-xs ml-0.5">{formatDate(res.updatedAt.toString())}</span>
                          </div>
                        </div>
                        <div className="border-t border-neutral-700 my-4" data-testid="breakline"></div>
                        <div className="flex justify-between gap-4 text-neutral-400 px-0.5">
                          <div className="overflow-hidde flex justify-center gap-x-1 sm:gap-x-3">
                            <Image
                              alt={res.user.name || res.user.email || ""}
                              loading="lazy"
                              width="25"
                              height="25"
                              decoding="async"
                              className="duration-700 ease-in-out scale-100 blur-0 grayscale-0 rounded-full min-w-8 min-h-8 max-w-8 max-h-8"
                              src={res?.user?.image || "https://cdn.fakercloud.com/avatars"}
                            />
                            <p>{res.user.name}</p>
                          </div>
                          <div className="flex justify-between gap-4">
                            <div className="flex gap-1 items-center">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 576 512"
                                height="14"
                                width="14"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path>
                              </svg>
                              <span className="text-xs font-medium ml-0.5">{res.viewCount | 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ActionButton>
              )
            })}
          </div>
          <ActionButton to="/project" className="font-semibold flex items-center gap-0 px-0 pr-2 justify-center my-0 py-0 hover:underline duration-300" rightIcon={<FaAngleRight />}><span>More Blogs</span></ActionButton>
        </div>
      )}
    </>
  )
}