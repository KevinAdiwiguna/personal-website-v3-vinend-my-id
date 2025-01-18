// Action
import { OAuthGithub, OAuthGoogle, ResendAuth } from "@/actions/auth-action";

// Icons
import { FaGithub, FaGoogle } from "react-icons/fa";

// Components
import { ActionButton } from "@/components/atoms/button";
import { HorizontalLine } from "@/components/atoms/horizontal-line";
import { InputWithLabel } from "@/components/atoms/input-with-label";


export default async function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center ">
			<div className="p-4 rounded-lg shadow-lg w-full md:max-w-md">
				<h1 className="text-2xl font-semibold mb-4">Log in</h1>
				<p className="text-sm mb-6">
					By continuing, you agree to our User Agreement and acknowledge that you
					understand the Privacy Policy.
				</p>

				<div className="space-y-4">
					<form action={OAuthGithub}>
						<ActionButton
							type="submit"
							className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 flex justify-center items-center"
							leftIcon={<FaGithub size={"20"} />}
						>
							<span>{"Continue with GitHub"}</span>
						</ActionButton>
					</form>
					<form action={OAuthGoogle}>
						<ActionButton
							type="submit"
							className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-400 flex justify-center items-center"
							leftIcon={<FaGoogle size={"20"} />}
						>
							<span>Continue with Google</span>
						</ActionButton>
					</form>
				</div>

				<HorizontalLine className="py-3"><span className="text-white">OR</span></HorizontalLine>
				<form action={ResendAuth}>
					<div className="space-y-4">
						<InputWithLabel
							id="email"
							label="Email"
							name="email"
							type="email"
						/>
					</div>

					<div className="mt-6">
						<ActionButton
							type="submit"
							className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition justify-center"
						>
							Login
						</ActionButton>
					</div>
				</form>
			</div >
		</div >
	);
}
