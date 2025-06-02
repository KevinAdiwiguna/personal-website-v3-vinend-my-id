"use client"
import { HiOutlineLogout } from 'react-icons/hi';
import { DASHBOARD_SIDEBAR_LINKS } from '@/constant/dashboard-link';
import { cn } from '@/lib/cn';
import { ActionButton } from '../atoms/button';
import { usePathname } from 'next/navigation';
import { SignOut } from '@/actions/auth-action';



export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
		<div className="bg-base-300  w-60 p-3 flex flex-col">
			{/* Header */}
			<div className="flex items-center gap-2 px-1 py-3">
				<span className="text-base-content text-lg">vinend.my.id</span>
			</div>

			{/* Sidebar Links */}
			<div className="py-8 flex flex-1 flex-col gap-0.5">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} label={link.label} path={link.path} icon={link.icon} active={pathname === link.path} />
				))}
			</div>

			{/* Bottom Links */}
			<div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
				{/* {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink
            key={link.key}
            label={link.label}
            path={link.path}
            icon={link.icon}
            active={pathname === link.path}
          />
        ))} */}
				{/* Logout */}
				<div onClick={() => SignOut()} className={cn("flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base", "cursor-pointer text-red-500")}>
					<span className="text-xl">
						<HiOutlineLogout />
					</span>
					Logout
				</div>
			</div>
		</div>
	);
}

interface SidebarLinkProps {
  label: string;
  path: string;
  icon: React.ReactNode;
  active?: boolean;
}

function SidebarLink({ icon, label, path, active }: SidebarLinkProps) {
  return (
    <ActionButton
      to={path}
      className={cn("flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base", active ? 'bg-neutral-700 text-white' : 'text-neutral-400')}
    >
      <div className='flex justify-center gap-x-4 items-center'>
        <span className="text-xl">{icon}</span>
        {label}
      </div>
    </ActionButton>
  );
}
