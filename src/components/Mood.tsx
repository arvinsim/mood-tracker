interface MoodProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
}

export const MoodItem: React.FC<MoodProps> = ({ children, color, ...rest }) => {
	return (
		<div
			className={`${color} rounded-full h-24 w-24 flex items-center justify-center text-white font-medium cursor-pointer transition-transform hover:scale-105 text-sm`}
			{...rest}
		>
			{children}
		</div>
	);
};
