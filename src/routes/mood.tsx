import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { MoodItem } from "../components/Mood";
import { getAllMoods, saveUserMood } from "../repositories/mood";

export const Route = createFileRoute("/mood")({
	component: Mood,
});

function Mood() {
	const [submissionState, setSubmissionState] = useState<
		"idle" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const onClickHandler = useCallback(async (moodId: number) => {
		const providerUserId = "google_12345"; // TODO: Hardcoded user id

		try {
			// Save the mood to the database
			await saveUserMood({ providerUserId, moodId });
			setSubmissionState("success");
		} catch (error) {
			setErrorMessage(
				`Failed to save mood: ${
					error instanceof Error ? error.message : "Unknown error"
				}`,
			);
		}
	}, []);

	const { data, isSuccess } = useQuery({
		queryKey: ["moods"],
		queryFn: () => {
			return getAllMoods();
		},
	});

	if (!isSuccess) {
		return (
			<div className="text-center text-2xl font-semibold mb-4 py-8">
				Error: No moods found
			</div>
		);
	}

	const moods = data || [];

	if (submissionState === "success") {
		return (
			<div className="flex flex-col items-center justify-center py-10">
				<div className="bg-green-100 border border-green-400 text-green-700 px-8 py-6 rounded mb-6">
					<h2 className="text-2xl font-bold mb-2">Mood Saved!</h2>
					<p className="mb-4">Your mood has been recorded.</p>
					<p className="text-sm text-green-600">
						Thank you for tracking your mood today.
					</p>
				</div>
				<button
					type="button"
					className="px-4 py-2 bg-accent-700 text-white rounded"
					onClick={() => setSubmissionState("idle")}
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
						{errorMessage || "Failed to save your mood. Please try again."}
					</p>
				</div>
				<button
					type="button"
					className="px-4 py-2 bg-accent-700 text-white rounded"
					onClick={() => setSubmissionState("idle")}
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<>
			{/* Question */}
			<div className="text-center text-2xl font-semibold mb-4 py-8">
				How are you feeling today?
			</div>

			{/* Moods */}
			<div className="flex items-center justify-center h-[64vh]">
				<div className="overflow-y-auto max-h-full w-full px-4 pb-4">
					<div className="grid grid-cols-3 gap-4">
						{moods.map((mood) => {
							return (
								<MoodItem
									key={mood.id}
									mood={mood}
									onClick={() => onClickHandler(Number(mood.id))}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}
