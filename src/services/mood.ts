import { type Mood, MoodRepository } from "../repositories/moodRepository";

export class MoodService {
	private repository: MoodRepository;

	constructor(repository = new MoodRepository()) {
		this.repository = repository;
	}

	async getMoods(): Promise<Mood[]> {
		return this.repository.getAll();
	}

	async recordMood(value: number, notes?: string): Promise<Mood> {
		return this.repository.save({
			value,
			notes,
			timestamp: new Date(),
		});
	}

	async getAverageMood(days = 7): Promise<number> {
		const moods = await this.repository.getAll();
		const recentMoods = moods.filter(
			(mood) => mood.timestamp > new Date(Date.now() - days * 86400000),
		);

		if (!recentMoods.length) return 0;
		return (
			recentMoods.reduce((sum, mood) => sum + mood.value, 0) /
			recentMoods.length
		);
	}
}
