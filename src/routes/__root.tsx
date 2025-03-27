import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
				<div className="max-h-screen bg-white rounded-3xl shadow-lg p-6 w-full max-w-96">
					<Outlet />

					{/* Mood and Energy Buttons */}
					<div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
						<Link
							to="/mood"
							className="py-3 rounded-xl bg-primary-100 font-medium text-center"
						>
							Mood
						</Link>
						<img src="/logo.svg" alt="Home" className="h-6 w-6" />
						<Link
							to="/energy"
							className="py-3 rounded-xl bg-secondary-100 font-medium text-center"
						>
							Energy
						</Link>
					</div>
				</div>
				<TanStackRouterDevtools />
			</div>
		);
	},
});
