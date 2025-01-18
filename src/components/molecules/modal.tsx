import React from "react";
import { ActionButton } from "@/components/atoms/button";


interface ModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	modalName: string;
	onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose, modalName }: ModalProps) => {
	return (
		<div
			className={`${isOpen ? "flex" : "hidden"} z-50 justify-center items-center w-full h-[80vh] fixed top-0`}>
			<div className="p-4 w-full max-w-2xl max-h-full">
				<div className="bg-white rounded-lg shadow dark:bg-gray-700">
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							{modalName}
						</h3>
						<ActionButton
							onClick={() => onClose()}
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14">
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
						</ActionButton>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
};
