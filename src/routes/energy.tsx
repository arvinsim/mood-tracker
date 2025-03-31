import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { EnergySlider } from "../components/EnergySlider";
import { saveUserEnergyLevel } from "../repositories/energy";

export const Route = createFileRoute("/energy")({
	component: Energy,
});

function Energy() {
	const [energyLevel, setEnergyLevel] = useState(1);

	const onClickHandler = useCallback(async () => {
		// TODO: Hardcoded user id
		const providerUserId = "google_12345";

		try {
			// Save the energy level to the database
			await saveUserEnergyLevel({ providerUserId, energyLevelId: energyLevel });
			alert(`Energy Level ${energyLevel} saved for user ${providerUserId}`);
		} catch (error) {
			// TODO:
			alert(`ERROR saving Energy Level, ${energyLevel} for ${providerUserId}`);
		}
	}, [energyLevel]);

	return (
		<>
			<div className="text-center text-2xl font-semibold mb-4 py-8">
				What is your energy level?
			</div>

			{/* Energy Tracker */}
			<div className="flex flex-col items-center my-4">
				<EnergySlider
					energyLevel={energyLevel}
					setEnergyLevel={setEnergyLevel}
				/>

				{/* Label */}
				<div className="text-lg font-semibold mt-8">
					Energy Level: {energyLevel}
				</div>

				<button
					type="button"
					className="mt-4 px-4 py-2 bg-accent-700 text-white rounded"
					onClick={onClickHandler}
				>
					Submit!
				</button>
			</div>
		</>
	);
}
