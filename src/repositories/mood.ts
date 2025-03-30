import { createClient } from "@supabase/supabase-js";

export interface Mood {
	id: string;
	mood_name: string;
}

const supabaseClient = createClient(
	import.meta.env.VITE_SUPABASE_URL || "",
	import.meta.env.VITE_SUPABASE_ANON_KEY || "",
);

export async function getAllMoods(): Promise<Mood[]> {
	const { data, error } = await supabaseClient.from("moods").select("*");

	if (error) throw error;
	return data as Mood[];
}
