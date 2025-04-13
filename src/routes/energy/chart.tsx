import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/energy/chart")({
	component: RouteComponent,
});

function RouteComponent() {
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth());

	// Mock data - replace with your actual data
	const getEnergyLevel = (date: Date): number => {
		// Return a value between 0 and 4 based on some logic or data
		return Math.floor(Math.random() * 5);
	};

	const getColorForEnergy = (level: number): string => {
		const colors = [
			"#e6f7ff", // Very low - light blue
			"#91d5ff", // Low - medium blue
			"#40a9ff", // Medium - blue
			"#1890ff", // High - bright blue
			"#096dd9", // Very high - dark blue
		];
		return colors[level] || colors[0];
	};

	const getDaysInMonth = (year: number, month: number): number => {
		return new Date(year, month + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (year: number, month: number): number => {
		return new Date(year, month, 1).getDay();
	};

	const renderCalendar = () => {
		const daysInMonth = getDaysInMonth(year, month);
		const firstDayOfMonth = getFirstDayOfMonth(year, month);
		const days = [];

		// Add empty cells for days before the first day of month
		for (let i = 0; i < firstDayOfMonth; i++) {
			days.push(
				<div key={`empty-${i}`} className="w-10 h-10 border border-gray-200" />,
			);
		}

		// Add cells for each day in the month
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month, day);
			const energyLevel = getEnergyLevel(date);
			const backgroundColor = getColorForEnergy(energyLevel);

			days.push(
				<div
					key={day}
					className="w-10 h-10 border border-gray-200 flex items-center justify-center"
					style={{ backgroundColor }}
				>
					<span className="text-xs">{day}</span>
				</div>,
			);
		}

		return days;
	};

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const changeMonth = (increment: number) => {
		let newMonth = month + increment;
		let newYear = year;

		if (newMonth > 11) {
			newMonth = 0;
			newYear += 1;
		} else if (newMonth < 0) {
			newMonth = 11;
			newYear -= 1;
		}

		setMonth(newMonth);
		setYear(newYear);
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Energy Level Calendar</h1>

			<div className="flex items-center justify-between mb-4">
				<button
					type="button"
					onClick={() => changeMonth(-1)}
					className="px-4 py-2 bg-blue-500 text-white rounded"
				>
					Previous
				</button>
				<h2 className="text-xl">
					{monthNames[month]} {year}
				</h2>
				<button
					type="button"
					onClick={() => changeMonth(1)}
					className="px-4 py-2 bg-blue-500 text-white rounded"
				>
					Next
				</button>
			</div>

			<div className="grid grid-cols-7 gap-1 mb-2">
				{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
					<div
						key={day}
						className="w-10 h-10 flex items-center justify-center font-medium"
					>
						{day}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

			<div className="mt-6 flex items-center">
				<span className="mr-2">Energy Level:</span>
				<div className="flex">
					{[0, 1, 2, 3, 4].map((level) => (
						<div key={level} className="flex items-center mr-4">
							<div
								className="w-4 h-4 mr-1"
								style={{ backgroundColor: getColorForEnergy(level) }}
							/>
							<span className="text-xs">
								{level === 0 ? "Very Low" : level === 4 ? "Very High" : level}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
