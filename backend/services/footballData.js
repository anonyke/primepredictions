/**
 * Football Data Service Abstraction.
 * Ingests external sports data or falls back to robust local mock fixtures.
 */

export class FootballDataService {
  constructor(apiKey = process.env.FOOTBALL_DATA_API_KEY) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.football-data.org/v4';
  }

  async getUpcomingMatches(leagueCode = 'PL') {
    if (!this.apiKey) {
      return this.getMockUpcomingMatches(leagueCode);
    }
    try {
      const response = await fetch(`${this.baseUrl}/competitions/${leagueCode}/matches?status=SCHEDULED`, {
        headers: { 'X-Auth-Token': this.apiKey },
      });
      if (!response.ok) throw new Error(`API error: ${response.statusText}`);
      const data = await response.json();
      return (data.matches || []).map(m => ({
        externalId: String(m.id),
        homeTeam: m.homeTeam.name,
        awayTeam: m.awayTeam.name,
        league: m.competition?.name || leagueCode,
        kickoff: m.utcDate,
        status: 'SCHEDULED',
      }));
    } catch (err) {
      console.warn('FootballDataService fetch error, falling back to mock fixtures:', err.message);
      return this.getMockUpcomingMatches(leagueCode);
    }
  }

  getMockUpcomingMatches(league = 'Premier League') {
    const now = Date.now();
    return [
      {
        externalId: `mock_${now}_1`,
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        league: 'Premier League',
        country: 'England',
        kickoff: new Date(now + 86400000).toISOString(),
        status: 'SCHEDULED',
        stats: {
          homeForm: ['W', 'W', 'D', 'W', 'L'],
          awayForm: ['L', 'W', 'W', 'D', 'W'],
          homeAvgGoals: 2.1,
          awayAvgGoals: 1.4,
          homeCleanSheetPct: 40,
          awayCleanSheetPct: 30,
        },
      },
      {
        externalId: `mock_${now}_2`,
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        league: 'La Liga',
        country: 'Spain',
        kickoff: new Date(now + 172800000).toISOString(),
        status: 'SCHEDULED',
        stats: {
          homeForm: ['W', 'W', 'W', 'D', 'W'],
          awayForm: ['W', 'L', 'W', 'W', 'W'],
          homeAvgGoals: 2.4,
          awayAvgGoals: 2.2,
          homeCleanSheetPct: 50,
          awayCleanSheetPct: 45,
        },
      },
    ];
  }
}

export default new FootballDataService();
