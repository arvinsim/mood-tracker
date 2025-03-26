import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/energy")({
	component: Energy,
});

function Energy() {
	return (
		<div className="p-2">
			<div className="text-3xl">What is your energy level?</div>
		</div>
	);
}
