import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/energy/chart")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/energy/chart"!</div>;
}
