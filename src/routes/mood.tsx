import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mood")({
	component: Mood,
});

function Mood() {
	return (
		<div className="p-2">
			<div className="text-3xl">How are you feeling today?</div>
		</div>
	);
}
