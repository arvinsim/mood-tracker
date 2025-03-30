import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { MoodItem } from "../components/Mood";
import { getAllMoods } from "../repositories/mood";

export const Route = createFileRoute("/mood")({
	component: Mood,
});

function Mood() {
	const { data, isSuccess } = useQuery({
		queryKey: ["moods"],
		queryFn: () => {
			return getAllMoods();
		},
	});

	if (!isSuccess) {
		return (
			<div className="text-center text-2xl font-semibold mb-4 py-8">
				Error: No moods found
			</div>
		);
	}

	const moods = data || [];

	return (
		<>
			{/* Question */}
			<div className="text-center text-2xl font-semibold mb-4 py-8">
				How are you feeling today?
			</div>

			{/* Moods */}
			<div className="flex items-center justify-center h-[64vh]">
				<div className="overflow-y-auto max-h-full w-full px-4 pb-4">
					<div className="grid grid-cols-3 gap-4">
						{moods.map((mood) => (
							<MoodItem key={mood.id} color={"bg-green-500"}>
								{mood.mood_name}
							</MoodItem>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
