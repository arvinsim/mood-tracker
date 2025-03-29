CREATE TABLE users (
    provider_user_id VARCHAR(255) PRIMARY KEY,
        provider VARCHAR(50) NOT NULL,  -- "google", "github", etc.
        first_login_at TIMESTAMP WITH TIME ZONE NOT NULL,
        last_login_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE energy_levels (
    id SERIAL PRIMARY KEY,
    provider_user_id VARCHAR(255) NOT NULL,  -- OAuth provider's user identifier
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    energy_level SMALLINT NOT NULL,
    notes TEXT
);

-- Add constraint to ensure energy_level is within a reasonable range
-- Assuming energy levels might be on a scale like 1-10 or 1-5
ALTER TABLE energy_levels ADD CONSTRAINT energy_level_range CHECK (energy_level > 0);

-- Index on timestamp for efficient time-based queries
CREATE INDEX idx_energy_levels_timestamp ON energy_levels(timestamp);

COMMENT ON TABLE energy_levels IS 'Tracks user energy levels over time';
COMMENT ON COLUMN energy_levels.id IS 'Primary key for energy level entries';
COMMENT ON COLUMN energy_levels.timestamp IS 'When the energy level was recorded';
COMMENT ON COLUMN energy_levels.energy_level IS 'Energy level value (SMALLINT is the smallest integer type in PostgreSQL)';
COMMENT ON COLUMN energy_levels.notes IS 'Optional notes that can be added by the user';

CREATE TABLE moods (
    id SERIAL PRIMARY KEY,
    provider_user_id VARCHAR(255) NOT NULL,  -- OAuth provider's user identifier
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    mood_name VARCHAR(255) NOT NULL,
    notes TEXT
);

-- Index on timestamp for efficient time-based queries
CREATE INDEX idx_moods_timestamp ON moods(timestamp);

COMMENT ON TABLE moods IS 'Tracks user moods over time';
COMMENT ON COLUMN moods.id IS 'Primary key for mood entries';
COMMENT ON COLUMN moods.timestamp IS 'When the mood was recorded';
COMMENT ON COLUMN moods.mood_name IS 'The name of the mood recorded';