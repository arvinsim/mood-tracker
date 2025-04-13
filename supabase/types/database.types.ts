export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			energy_levels: {
				Row: {
					id: number;
					level_name: string | null;
					level_value: number;
				};
				Insert: {
					id?: number;
					level_name?: string | null;
					level_value: number;
				};
				Update: {
					id?: number;
					level_name?: string | null;
					level_value?: number;
				};
				Relationships: [];
			};
			moods: {
				Row: {
					id: number;
					mood_name: string;
				};
				Insert: {
					id?: number;
					mood_name: string;
				};
				Update: {
					id?: number;
					mood_name?: string;
				};
				Relationships: [];
			};
			user_energy_levels: {
				Row: {
					energy_level_id: number;
					id: number;
					notes: string | null;
					provider_user_id: string;
					timestamp: string;
				};
				Insert: {
					energy_level_id: number;
					id?: number;
					notes?: string | null;
					provider_user_id: string;
					timestamp?: string;
				};
				Update: {
					energy_level_id?: number;
					id?: number;
					notes?: string | null;
					provider_user_id?: string;
					timestamp?: string;
				};
				Relationships: [
					{
						foreignKeyName: "user_energy_levels_energy_level_id_fkey";
						columns: ["energy_level_id"];
						isOneToOne: false;
						referencedRelation: "energy_levels";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "user_energy_levels_provider_user_id_fkey";
						columns: ["provider_user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["provider_user_id"];
					},
				];
			};
			user_moods: {
				Row: {
					id: number;
					mood_id: number;
					notes: string | null;
					provider_user_id: string;
					timestamp: string;
				};
				Insert: {
					id?: number;
					mood_id: number;
					notes?: string | null;
					provider_user_id: string;
					timestamp?: string;
				};
				Update: {
					id?: number;
					mood_id?: number;
					notes?: string | null;
					provider_user_id?: string;
					timestamp?: string;
				};
				Relationships: [
					{
						foreignKeyName: "user_moods_mood_id_fkey";
						columns: ["mood_id"];
						isOneToOne: false;
						referencedRelation: "moods";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "user_moods_provider_user_id_fkey";
						columns: ["provider_user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["provider_user_id"];
					},
				];
			};
			users: {
				Row: {
					first_login_at: string;
					last_login_at: string;
					provider: string;
					provider_user_id: string;
				};
				Insert: {
					first_login_at: string;
					last_login_at: string;
					provider: string;
					provider_user_id: string;
				};
				Update: {
					first_login_at?: string;
					last_login_at?: string;
					provider?: string;
					provider_user_id?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	graphql_public: {
		Enums: {},
	},
	public: {
		Enums: {},
	},
} as const;
