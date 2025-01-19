import React from 'react'
import Image from 'next/image'

// Components
import { Footer } from '@/components/organisms/footer'
import { ExperienceSection } from '@/components/organisms/experience-section'
import { ServicesSection } from '@/components/organisms/services-section'
import { StackSection } from '@/components/organisms/stack-section'
import { TechScroll } from '@/components/organisms/tech-scroll'

import { SocialMediaList } from '@/components/molecules/social-media-card'

import { ActionButton } from '@/components/atoms/button'

// Icons
import { FaDownload, FaGithub } from 'react-icons/fa'
import { BlogSection } from '@/components/organisms/blog-section'
import { ProjectSection } from '@/components/organisms/project-section'

const page = () => {
  return (
    <>
      <section
        id="profile"
        className="container mx-auto flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8 ">
        <div className="relative h-[150px] w-[130px] flex-shrink-0 overflow-hidden rounded-lg bg-[#0E0E10] sm:h-[260px] sm:w-[280px]">
          <Image
            alt="KevinAdiwiguna"
            className="h-full w-full rounded-lg object-cover text-transparent"
            src={'/assets/images/images.jpeg'}
            width={280}
            height={260}
          />
        </div>
        <div className="flex-1">
          <h3 className="basic-description-color text-base font-bold sm:text-lg">
            <i>👋</i> Hello I Am
          </h3>
          <h1 className="mt-2 text-3xl font-bold">Kevin Adiwiguna</h1>
          <SocialMediaList responsive={true} />
          <p className="basic-description-color mt-8 hidden sm:block">
            Passionate Web &amp; Mobile Developer with 3+ years of professional
            experience. Specializing in creating innovative solutions using modern
            technologies. Proven track record of delivering high-quality.
          </p>
          <div className="mt-4 hidden items-center gap-4 sm:flex">
            <ActionButton
              leftIcon={<FaGithub className="text-xl" />}
              className="flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-center basic-hover"
              to="mailto:adiwigunakevin@gmail.com">
              Email Me
            </ActionButton>
            <ActionButton
              target="_blank"
              download="CV-Kevin-Adiwiguna.pdf"
              leftIcon={<FaDownload className="text-xl" />}
              className="flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-center basic-hover"
              to="https://docs.google.com/document/d/1rGu1DqtaNKyTI922k4rkiJUYHuIevLGGw7LnWD6ySa4/edit?tab=t.0">
              Download CV
            </ActionButton>
          </div>
        </div>
      </section>

      <section className="mt-4 sm:hidden">
        <p className="mt-4 basic-description-color">
          Passionate Fullstack Web Developer with 2+ years of professional experience.
          Specializing in creating innovative solutions using modern technologies. Proven
          track record of delivering high-quality.
        </p>
        <div className="mt-4 hidden items-center justify-center gap-4 md:flex md:justify-start">
          <ActionButton
            leftIcon={<FaGithub className="text-xl" />}
            className="flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-center basic-button"
            to="mailto:adiwigunakevin@gmail.com">
            Email Me
          </ActionButton>
          <ActionButton
            target="_blank"
            leftIcon={<FaDownload className="text-xl" />}
            download="CV-Kevin-Adiwiguna.pdf"
            className="flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-center basic-button"
            to="https://docs.google.com/document/d/1rGu1DqtaNKyTI922k4rkiJUYHuIevLGGw7LnWD6ySa4/edit?tab=t.0">
            Download CV
          </ActionButton>
        </div>
      </section>
      <TechScroll />

      <ExperienceSection />

      <BlogSection />

      <StackSection />

      <ProjectSection />

      <ServicesSection />

      <Footer />

    </>
  )
}

export default page