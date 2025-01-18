import React from "react";
import { FaHome, FaBriefcase, FaLayerGroup, FaCog, FaBloggerB } from "react-icons/fa";

interface NavigationProps {
  icon: React.ReactNode;
  url: string
  tooltip?: string;
}

export const NAVIGATION: NavigationProps[] = [
  {
    icon: <FaHome />,
    url: "#",
    tooltip: "Home"
  },
  {
    icon: <FaBriefcase />,
    url: "#experience",
    tooltip: "Experience",
  },
  {
    icon: <FaLayerGroup />,
    url: "#stacks",
    tooltip: "Stacks",
  },
  {
    icon: <FaCog />,
    url: "#services",
    tooltip: "Services",
  },
  {
    icon: <FaBloggerB />,
    url: "/blogs",
    tooltip: "Blog",
  }
];
