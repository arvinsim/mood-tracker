CREATE TABLE users (
    provider_user_id VARCHAR(255) PRIMARY KEY,
    provider VARCHAR(50) NOT NULL,  -- "google", "github", etc.
    first_login_at TIMESTAMP WITH TIME ZONE NOT NULL,
    last_login_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Energy level definition table
CREATE TABLE energy_levels (
    id SERIAL PRIMARY KEY,
    level_value SMALLINT NOT NULL UNIQUE,
    level_name VARCHAR(50)
);

-- Add constraint to ensure energy_level is within a reasonable range
ALTER TABLE energy_levels ADD CONSTRAINT energy_level_range CHECK (level_value > 0);

COMMENT ON TABLE energy_levels IS 'Defines possible energy levels';
COMMENT ON COLUMN energy_levels.id IS 'Primary key for energy level definitions';
COMMENT ON COLUMN energy_levels.level_value IS 'The numeric value of the energy level';
COMMENT ON COLUMN energy_levels.level_name IS 'Optional descriptive name for the energy level';

-- User energy level entries table
CREATE TABLE user_energy_levels (
    id SERIAL PRIMARY KEY,
    provider_user_id VARCHAR(255) NOT NULL,
    energy_level_id INTEGER NOT NULL REFERENCES energy_levels(id),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    notes TEXT,
    FOREIGN KEY (provider_user_id) REFERENCES users(provider_user_id)
);

-- Index on timestamp for efficient time-based queries
CREATE INDEX idx_user_energy_levels_timestamp ON user_energy_levels(timestamp);
CREATE INDEX idx_user_energy_levels_user_id ON user_energy_levels(provider_user_id);

COMMENT ON TABLE user_energy_levels IS 'Tracks user energy levels over time';
COMMENT ON COLUMN user_energy_levels.id IS 'Primary key for user energy level entries';
COMMENT ON COLUMN user_energy_levels.timestamp IS 'When the energy level was recorded';
COMMENT ON COLUMN user_energy_levels.notes IS 'Optional notes that can be added by the user';

-- Mood definition table
CREATE TABLE moods (
    id SERIAL PRIMARY KEY,
    mood_name VARCHAR(255) NOT NULL UNIQUE
);

COMMENT ON TABLE moods IS 'List of possible moods';
COMMENT ON COLUMN moods.id IS 'Primary key for mood definitions';
COMMENT ON COLUMN moods.mood_name IS 'The name of the mood';

-- User mood entries table
CREATE TABLE user_moods (
    id SERIAL PRIMARY KEY,
    provider_user_id VARCHAR(255) NOT NULL,  -- OAuth provider's user identifier
    mood_id INTEGER NOT NULL REFERENCES moods(id),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    notes TEXT,
    FOREIGN KEY (provider_user_id) REFERENCES users(provider_user_id)
);

-- Index on timestamp for efficient time-based queries
CREATE INDEX idx_user_moods_timestamp ON user_moods(timestamp);
CREATE INDEX idx_user_moods_user_id ON user_moods(provider_user_id);

COMMENT ON TABLE user_moods IS 'Tracks user moods over time';
COMMENT ON COLUMN user_moods.id IS 'Primary key for user mood entries';
COMMENT ON COLUMN user_moods.timestamp IS 'When the mood was recorded';
COMMENT ON COLUMN user_moods.notes IS 'Optional notes that can be added by the user';