import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/energy")({
	component: Energy,
});

function Energy() {
	const [energyLevel, setEnergyLevel] = useState(1);

	const barColor =
		energyLevel === 1
			? "bg-red-500"
			: energyLevel === 2
				? "bg-orange-500"
				: energyLevel === 3
					? "bg-yellow-500"
					: energyLevel === 4
						? "bg-blue-500"
						: "bg-green-500";

	return (
		<>
			<div className="text-center text-2xl font-semibold mb-4 py-8">
				What is your energy level?
			</div>

			{/* Energy Tracker */}
			<div className="flex flex-col items-center my-4">
				<div className="relative h-64 w-16 bg-gray-200 rounded-full mb-2">
					<div
						className={`absolute inset-x-0 bottom-0 rounded-full transition-all duration-300 ${barColor}`}
						style={{
							height: `${(energyLevel / 5) * 100}%`,
						}}
					/>
					<div className="absolute inset-0 flex flex-col justify-between items-center py-2 pointer-events-none">
						{[5, 4, 3, 2, 1].map((level) => (
							<div key={level} className="font-bold text-gray-700">
								{level}
							</div>
						))}
					</div>
				</div>

				<input
					type="range"
					min="1"
					max="5"
					step="1"
					value={energyLevel}
					onChange={(e) => setEnergyLevel(Number(e.target.value))}
					className="w-64 mt-20 mb-20"
				/>

				<div className="text-lg font-semibold mt-2">Level: {energyLevel}</div>
			</div>
		</>
	);
}
