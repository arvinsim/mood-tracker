-- Sample data for users table
INSERT INTO users (provider_user_id, provider, first_login_at, last_login_at)
VALUES 
('google_12345', 'google', '2025-01-15T10:30:00Z', '2025-03-28T08:45:00Z'),
('github_67890', 'github', '2025-02-20T14:20:00Z', '2025-03-27T19:15:00Z'),
('apple_24680', 'apple', '2025-03-01T09:00:00Z', '2025-03-29T11:30:00Z');

-- Sample data for energy_levels table
INSERT INTO energy_levels (level_value, level_name)
VALUES
(1, 'Very Low'),
(2, 'Low'),
(3, 'Moderate'),
(4, 'High'),
(5, 'very High');

-- Sample data for user_energy_levels table
INSERT INTO user_energy_levels (provider_user_id, energy_level_id, timestamp, notes)
VALUES
('google_12345', 1, '2025-03-27T08:00:00Z', 'Feeling exhausted today'),
('github_67890', 2, '2025-03-28T14:30:00Z', 'Average energy after lunch'),
('apple_24680', 3, '2025-03-29T07:15:00Z', 'Great energy this morning');

-- Sample data for moods table
INSERT INTO moods (mood_name)
VALUES
('Happy'),
('Anxious'),
('Focused'),
('Sad'),
('Excited'),
('Calm'),
('Frustrated'),
('Grateful'),
('Overwhelmed');

-- Sample data for user_moods table
INSERT INTO user_moods (provider_user_id, mood_id, timestamp, notes)
VALUES
('google_12345', 1, '2025-03-27T08:00:00Z', 'Started the day with good news'),
('github_67890', 2, '2025-03-28T16:45:00Z', 'Deadline approaching'),
('apple_24680', 3, '2025-03-29T10:30:00Z', 'Deep work session');