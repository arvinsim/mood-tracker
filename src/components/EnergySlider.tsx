import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAllEnergyLevels } from "../repositories/energy";

export function EnergySlider({
	energyLevel,
	setEnergyLevel,
}: { energyLevel: number; setEnergyLevel: (level: number) => void }) {
	const [isDragging, setIsDragging] = useState(false);
	const barRef = useRef<HTMLDivElement>(null);

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

	const handleBarInteraction = useCallback(
		(clientY: number) => {
			if (!barRef.current) return;

			const rect = barRef.current.getBoundingClientRect();
			const barHeight = rect.height;
			const positionY = clientY - rect.top;

			// Calculate level based on position (inverted because 5 is at the top)
			let newLevel = 5 - Math.floor((positionY / barHeight) * 5);

			// Ensure value is within 1-5 range
			newLevel = Math.max(1, Math.min(5, newLevel));
			setEnergyLevel(newLevel);
		},
		[setEnergyLevel],
	);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			setIsDragging(true);
			handleBarInteraction(e.clientY);
		},
		[handleBarInteraction],
	);

	const handleTouchStart = useCallback(
		(e: React.TouchEvent) => {
			setIsDragging(true);
			handleBarInteraction(e.touches[0].clientY);
		},
		[handleBarInteraction],
	);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (isDragging) {
				handleBarInteraction(e.clientY);
			}
		},
		[isDragging, handleBarInteraction],
	);

	const handleTouchMove = useCallback(
		(e: TouchEvent) => {
			if (isDragging) {
				handleBarInteraction(e.touches[0].clientY);
			}
		},
		[isDragging, handleBarInteraction],
	);

	const handleEnd = useCallback(() => {
		setIsDragging(false);
	}, []);

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleEnd);
		window.addEventListener("touchmove", handleTouchMove);
		window.addEventListener("touchend", handleEnd);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleEnd);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleEnd);
		};
	}, [handleMouseMove, handleTouchMove, handleEnd]);

	const { data, isSuccess } = useQuery({
		queryKey: ["energy_levels"],
		queryFn: () => {
			return getAllEnergyLevels();
		},
	});

	if (!isSuccess) {
		return (
			<div className="text-center text-2xl font-semibold mb-4 py-8">
				Error: No energy levels found
			</div>
		);
	}

	const energyLevels = data || [];

	return (
		<div
			ref={barRef}
			className="relative h-64 w-16 rounded-xl bg-gray-200 mb-2 cursor-pointer"
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}
		>
			{/* Energy Bar */}
			<div
				className={`absolute inset-x-0 bottom-0 rounded-xl transition-all duration-100 ${barColor}`}
				style={{
					height: `${(energyLevel / 5) * 100}%`,
				}}
			/>

			{/* Levels */}
			<div className="absolute inset-0 flex flex-col justify-between items-center py-2 pointer-events-none">
				{[...energyLevels].reverse().map((level) => (
					<div key={level.id} className="font-bold text-gray-700">
						{level.level_value}
					</div>
				))}
			</div>
		</div>
	);
}
