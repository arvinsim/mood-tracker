import type { Mood } from "../repositories/mood";

interface MoodProps extends React.HTMLAttributes<HTMLButtonElement> {
	mood: Mood;
}

export const MoodItem: React.FC<MoodProps> = ({ mood, onClick, ...rest }) => {
	return (
		<button
			type="button"
			className={
				"bg-green-500 rounded-full h-24 w-24 flex items-center justify-center text-white font-medium cursor-pointer transition-transform hover:scale-105 text-sm"
			}
			{...rest}
			onClick={onClick}
		>
			{mood.mood_name}
		</button>
	);
};
