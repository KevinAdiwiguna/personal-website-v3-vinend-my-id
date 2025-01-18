import { ActionButton } from "@/components/atoms/button";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

interface StackProps {
  name: string;
  img: string;
  description: string;
  star: boolean;
  link: string;
}

export const StackCard = ({ description, img, link, name, star }: StackProps) => {
  return (
    <ActionButton
      target="_blank"
      className="p-2 border cursor-pointer border-neutral-800 rounded-xl group mt-4 transition-all duration-300 card-hover"
      to={link}>
      <div className="w-full flex justify-between items-center">
        <section className="flex items-center justify-between transition-colors duration-300">
          <div className="flex items-center gap-2">
            <div className="h-[50px] w-[50px] bg-[#19191A] border border-neutral-800 p-2 rounded-xl">
              <Image
                alt={name}
                className="bg-white rounded-full p-1 w-[2rem] h-[2rem]"
                src={img}
                width={32}
                height={32}
              />
            </div>
            <div>
              <div className="flex items-center">
                <h1 className="font-bold">
                  {name}
                </h1>
                {star && (
                  <i className="fa-solid fa-star text-yellow-300 ml-1 text-xs"></i>
                )}
              </div>
              <p className="text-xs basic-description-color">
                {description}
              </p>
            </div>
          </div>
        </section>
        <FaArrowRight className="group text-sm text-neutral-400 dark:text-neutral-200 group-hover:rotate-[-45deg]  transition-all duration-300 opacity-100" />
      </div>
    </ActionButton>
  );
};
