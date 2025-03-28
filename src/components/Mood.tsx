import { useCallback } from "react";

interface MoodProps extends React.HTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
}

export const MoodItem: React.FC<MoodProps> = ({ children, color, ...rest }) => {
	const onClickHandler = useCallback(() => {
		console.info(`MoodItem clicked: ${color}`);
	}, [color]);

	return (
		<button
			type="button"
			className={`${color} rounded-full h-24 w-24 flex items-center justify-center text-white font-medium cursor-pointer transition-transform hover:scale-105 text-sm`}
			{...rest}
			onClick={onClickHandler}
		>
			{children}
		</button>
	);
};
