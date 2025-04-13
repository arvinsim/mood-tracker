import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { EnergySlider } from "../../components/EnergySlider";
import { saveUserEnergyLevel } from "../../repositories/energy";

export const Route = createFileRoute("/energy/")({
	component: Energy,
});

function Energy() {
	const [energyLevel, setEnergyLevel] = useState(1);
	const [submissionState, setSubmissionState] = useState<
		"idle" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const resetForm = useCallback(() => {
		setSubmissionState("idle");
		setErrorMessage(null);
	}, []);

	const onClickHandler = useCallback(async () => {
		// TODO: Hardcoded user id
		const providerUserId = "google_12345";

		try {
			// Save the energy level to the database
			await saveUserEnergyLevel({ providerUserId, energyLevelId: energyLevel });
			setSubmissionState("success");
		} catch (error) {
			setErrorMessage(
				`Failed to save energy level: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	}, [energyLevel]);

	if (submissionState === "success") {
		return (
			<div className="flex flex-col items-center justify-center py-10">
				<div className="bg-green-100 border border-green-400 text-green-700 px-8 py-6 rounded mb-6">
					<h2 className="text-2xl font-bold mb-2">Energy Level Saved!</h2>
					<p className="mb-4">
						Your energy level of {energyLevel} has been recorded.
					</p>
					<p className="text-sm text-green-600">
						Thank you for tracking your energy today.
					</p>
				</div>
				<button
					type="button"
					className="px-4 py-2 bg-accent-700 text-white rounded"
					onClick={resetForm}
				>
					Track Another Entry
				</button>
			</div>
		);
	}

	if (submissionState === "error") {
		return (
			<div className="flex flex-col items-center justify-center py-10">
				<div className="bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded mb-6">
					<h2 className="text-2xl font-bold mb-2">Something Went Wrong</h2>
					<p className="mb-4">
						{errorMessage ||
							"Failed to save your energy level. Please try again."}
					</p>
				</div>
				<button
					type="button"
					className="px-4 py-2 bg-accent-700 text-white rounded"
					onClick={resetForm}
				>
					Try Again
				</button>
			</div>
		);
	}

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
