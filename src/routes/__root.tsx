import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<div className="bg-background-400 w-screen h-screen flex flex-col">
			<div>
				<Outlet />
			</div>
			<div className="p-2 flex gap-2">
				<Link to="/mood" className="[&.active]:font-bold">
					Mood
				</Link>{" "}
				<Link to="/energy" className="[&.active]:font-bold">
					Energy
				</Link>
			</div>
			<TanStackRouterDevtools />
		</div>
	),
});
