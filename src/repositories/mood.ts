import { createClient } from "@supabase/supabase-js";

export interface Mood {
	id: string;
	mood_name: string;
}

const supabaseClient = createClient(
	process.env.SUPABASE_URL || "",
	process.env.SUPABASE_ANON_KEY || "",
);

export async function getAll(): Promise<Mood[]> {
	const { data, error } = await supabaseClient.from("moods").select("*");

	if (error) throw error;
	return data as Mood[];
}

export async function save(mood: Omit<Mood, "id">): Promise<Mood> {
	const { data, error } = await supabaseClient
		.from("moods")
		.insert(mood)
		.select()
		.single();

	if (error) throw error;
	return data as Mood;
}
