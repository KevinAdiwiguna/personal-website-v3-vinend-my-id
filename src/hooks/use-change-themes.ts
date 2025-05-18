import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useChangeThemes = () => {
	const { theme, setTheme } = useTheme();
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		if (theme === "dark") {
			setIsDark(true);
		} else {
			setIsDark(false);
		}
	}, [theme]);

	const toggleTheme = () => {
		const newTheme = isDark ? "light" : "dark";
		setTheme(newTheme);
	};

	return { isDark, toggleTheme };
};
