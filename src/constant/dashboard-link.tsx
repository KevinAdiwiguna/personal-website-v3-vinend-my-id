import { FaTags } from 'react-icons/fa';
import {
	HiOutlineViewGrid,
	HiOutlineUsers,
	HiOutlineCube,
	HiOutlineAnnotation,
	HiOutlineDocumentText,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
} from 'react-icons/hi';

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/dashboard',
		icon: <HiOutlineViewGrid />,
	},
	{
		key: 'user',
		label: 'Users',
		path: '/dashboard/users',
		icon: <HiOutlineUsers />,
	},
	{
		key: 'technology',
		label: 'Technology',
		path: '/dashboard/technology',
		icon: <HiOutlineCube />,
	},
	{
		key: 'tag',
		label: 'Tag',
		path: '/dashboard/tag',
		icon: <FaTags />,
	},
	{
		key: 'projects',
		label: 'Projects',
		path: '/dashboard/projects',
		icon: <HiOutlineDocumentText />,
	},
	{
		key: 'blogs',
		label: 'Blogs',
		path: '/dashboard/blogs',
		icon: <HiOutlineAnnotation />,
	},
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />,
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />,
	},
];
