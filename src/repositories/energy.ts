import { createClient } from "@supabase/supabase-js";

export interface EnergyLevels {
	id: string;
	level_value: string;
	level_name: string;
}

const supabaseClient = createClient(
	import.meta.env.VITE_SUPABASE_URL || "",
	import.meta.env.VITE_SUPABASE_ANON_KEY || "",
);

export async function getAllEnergyLevels(): Promise<EnergyLevels[]> {
	const { data, error } = await supabaseClient
		.from("energy_levels")
		.select("*");

	if (error) throw error;
	return data as EnergyLevels[];
}
