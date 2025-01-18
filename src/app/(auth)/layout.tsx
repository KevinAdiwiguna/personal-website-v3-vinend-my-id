import type { Metadata } from "next";

// styles
import "@/styles/globals.css";

// Providers
import { Provider } from "@/providers/session-providers";

// Metadata
export const metadata: Metadata = {
	title: "vinend - Login",
	description: "Login to Dashboard",
};

export default async function AuthLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body >
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
