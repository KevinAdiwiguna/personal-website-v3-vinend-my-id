import { SERVICES } from "@/constant/services";
import { ActionButton } from "@/components/atoms/button";
import { FaArrowRight } from "react-icons/fa";


export const ServicesCard = () => {
  return (
    <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {SERVICES.map((res, key) => {
        return (
          <ActionButton
            key={key}
            target="_blank"
            className="p-4 border cursor-pointer border-neutral-800 rounded-lg group dark:border-neutral-700 relative overflow-hidden transition-all duration-300 card-hover"
            to="mailto:adiwigunakevin@gmail.com?subject=I want to order your service - Fixing Bugs">
            <div className="flex justify-between items-center py-2 ">
              <section className="transition-colors duration-300 z-10 gap-x-4">
                <section className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#19191A] border border-neutral-800 rounded-md p-2">
                      {res.icon}
                    </div>
                    <h1 className="font-bold text-lg">
                      {res.title}
                    </h1>
                  </div>
                </section>
                <p className="text-sm basic-description-color">
                  {res.description}
                </p>
              </section>
              <FaArrowRight className="text-sm text-neutral-400 dark:text-neutral-200 group-hover:rotate-[-45deg]  transition-all duration-300 opacity-100" />
            </div>
          </ActionButton>
        );
      })}
    </section>
  );
};
