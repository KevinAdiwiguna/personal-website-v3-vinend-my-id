import { SocialMediaList } from "@/components/molecules/social-media-card";


export const RightBar = () => {
  return (
    <aside className="sticky top-0 hidden h-screen border-l border-neutral-800 lg:block dark:border-neutral-700">
      <div className="ml-8 flex h-screen flex-col items-start justify-center gap-4">
        <SocialMediaList isCol={true} />
      </div>
    </aside>
  );
}
