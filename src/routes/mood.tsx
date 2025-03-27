import { createFileRoute } from "@tanstack/react-router";
import { MoodItem } from "../components/Mood";

export const Route = createFileRoute("/mood")({
	component: Mood,
});

function Mood() {
	const moods = [
		{
			id: 1,
			name: "Happy",
			color: "bg-yellow-500",
		},
		{
			id: 2,
			name: "Sad",
			color: "bg-blue-500",
		},
		{
			id: 3,
			name: "Angry",
			color: "bg-red-500",
		},
		{
			id: 4,
			name: "Tired",
			color: "bg-gray-500",
		},
		{
			id: 5,
			name: "Excited",
			color: "bg-green-500",
		},
		{
			id: 6,
			name: "Anxious",
			color: "bg-purple-500",
		},
		{
			id: 7,
			name: "Calm",
			color: "bg-teal-500",
		},
		{
			id: 8,
			name: "Confused",
			color: "bg-indigo-500",
		},
		{
			id: 9,
			name: "Frustrated",
			color: "bg-pink-500",
		},
		{
			id: 10,
			name: "Grateful",
			color: "bg-amber-500",
		},
		{
			id: 11,
			name: "Hopeful",
			color: "bg-lime-500",
		},
		{
			id: 12,
			name: "Inspired",
			color: "bg-emerald-500",
		},
		{
			id: 13,
			name: "Lonely",
			color: "bg-violet-500",
		},
		{
			id: 14,
			name: "Loved",
			color: "bg-rose-500",
		},
		{
			id: 15,
			name: "Nervous",
			color: "bg-cyan-500",
		},
		{
			id: 16,
			name: "Overwhelmed",
			color: "bg-amber-500",
		},
		{
			id: 17,
			name: "Peaceful",
			color: "bg-lime-500",
		},
		{
			id: 18,
			name: "Relaxed",
			color: "bg-emerald-500",
		},
		{
			id: 19,
			name: "Stressed",
			color: "bg-violet-500",
		},
		{
			id: 20,
			name: "Surprised",
			color: "bg-rose-500",
		},
		{
			id: 21,
			name: "Worried",
			color: "bg-cyan-500",
		},
		{
			id: 22,
			name: "Other",
			color: "bg-gray-500",
		},
	];

	return (
		<>
			{/* Question */}
			<div className="text-center text-lg font-semibold mb-4">
				How are you feeling today?
			</div>

			{/* Circle Area */}
			<div className="flex items-center justify-center">
				<div className="grid grid-cols-3 gap-4">
					{moods.map((mood) => (
						<MoodItem key={mood.id} color={mood.color}>
							{mood.name}
						</MoodItem>
					))}
				</div>
			</div>
		</>
	);
}
