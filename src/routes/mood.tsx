import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mood")({
	component: Mood,
});

function Mood() {
	return (
		<>
			{/* Question */}
			<div className="text-center text-lg font-semibold mb-4">
				How are you feeling today?
			</div>

			{/* Circle Area */}
			<div className="flex items-center justify-center h-48 mb-6 border rounded-2xl">
				Moods here
			</div>
		</>
	);
}
