-- Sample data for users table
INSERT INTO users (provider_user_id, provider, first_login_at, last_login_at)
VALUES 
('google_12345', 'google', '2025-01-15T10:30:00Z', '2025-03-28T08:45:00Z'),
('github_67890', 'github', '2025-02-20T14:20:00Z', '2025-03-27T19:15:00Z'),
('apple_24680', 'apple', '2025-03-01T09:00:00Z', '2025-03-29T11:30:00Z');

-- Sample data for energy_levels table
INSERT INTO energy_levels (provider_user_id, timestamp, energy_level, notes)
VALUES
('google_12345', '2025-03-27T08:00:00Z', 8, 'Morning energy after good sleep'),
('google_12345', '2025-03-28T14:30:00Z', 4, 'Post-lunch energy dip'),
('github_67890', '2025-03-28T20:15:00Z', 6, 'Moderate energy in the evening');

-- Sample data for moods table
INSERT INTO moods (provider_user_id, timestamp, mood_name, notes)
VALUES
('google_12345', '2025-03-27T08:00:00Z', 'Happy', 'Started the day with great news'),
('apple_24680', '2025-03-28T12:00:00Z', 'Focused', 'Deep work session on project'),
('github_67890', '2025-03-29T09:30:00Z', 'Excited', 'Looking forward to weekend plans');