/**
 * Pure deterministic settlement engine for football predictions.
 * Takes fixture scoreline and evaluates market outcome.
 */

export function evaluatePrediction(market, selection, homeScore, awayScore, matchStatus = 'FINISHED') {
  if (matchStatus === 'POSTPONED') {
    return { outcome: 'POSTPONED', isSettled: true, reason: 'Match postponed' };
  }
  if (matchStatus === 'CANCELLED') {
    return { outcome: 'VOID', isSettled: true, reason: 'Match cancelled' };
  }
  if (matchStatus !== 'FINISHED' || homeScore === null || awayScore === null) {
    return { outcome: 'PENDING', isSettled: false, reason: 'Match not finished or score incomplete' };
  }

  const totalGoals = homeScore + awayScore;
  const normalizedSelection = String(selection).trim().toUpperCase();
  const normalizedMarket = String(market).trim();

  // 1X2 Market
  if (normalizedMarket === '1X2') {
    let actualOutcome = 'X';
    if (homeScore > awayScore) actualOutcome = '1';
    else if (awayScore > homeScore) actualOutcome = '2';

    if (normalizedSelection === actualOutcome ||
        (normalizedSelection === 'HOME' && actualOutcome === '1') ||
        (normalizedSelection === 'DRAW' && actualOutcome === 'X') ||
        (normalizedSelection === 'AWAY' && actualOutcome === '2')) {
      return { outcome: 'WIN', isSettled: true, actualOutcome };
    }
    return { outcome: 'LOSS', isSettled: true, actualOutcome };
  }

  // Double Chance Market
  if (normalizedMarket === 'Double Chance') {
    const isHome = homeScore > awayScore;
    const isDraw = homeScore === awayScore;
    const isAway = awayScore > homeScore;

    if (normalizedSelection === '1X' && (isHome || isDraw)) return { outcome: 'WIN', isSettled: true };
    if (normalizedSelection === 'X2' && (isDraw || isAway)) return { outcome: 'WIN', isSettled: true };
    if (normalizedSelection === '12' && (isHome || isAway)) return { outcome: 'WIN', isSettled: true };
    return { outcome: 'LOSS', isSettled: true };
  }

  // Over/Under Market
  if (normalizedMarket === 'Over/Under' || normalizedMarket.toLowerCase().includes('over') || normalizedMarket.toLowerCase().includes('under')) {
    const parts = normalizedSelection.split(' ');
    const type = parts[0];
    const threshold = parseFloat(parts[1] || '2.5');

    if (type === 'OVER') {
      return totalGoals > threshold
        ? { outcome: 'WIN', isSettled: true, totalGoals }
        : { outcome: 'LOSS', isSettled: true, totalGoals };
    }
    if (type === 'UNDER') {
      return totalGoals < threshold
        ? { outcome: 'WIN', isSettled: true, totalGoals }
        : { outcome: 'LOSS', isSettled: true, totalGoals };
    }
  }

  // BTTS (Both Teams To Score)
  if (normalizedMarket === 'BTTS') {
    const bothScored = homeScore > 0 && awayScore > 0;
    if (normalizedSelection === 'YES' && bothScored) return { outcome: 'WIN', isSettled: true };
    if (normalizedSelection === 'NO' && !bothScored) return { outcome: 'WIN', isSettled: true };
    return { outcome: 'LOSS', isSettled: true };
  }

  // Correct Score
  if (normalizedMarket === 'Correct Score') {
    const expected = `${homeScore}-${awayScore}`;
    if (normalizedSelection.replace(/\s+/g, '') === expected) {
      return { outcome: 'WIN', isSettled: true };
    }
    return { outcome: 'LOSS', isSettled: true };
  }

  return { outcome: 'VOID', isSettled: true, reason: 'Unsupported market' };
}
