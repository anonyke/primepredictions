import PredictionCard from "../components/PredictionCard";
import MatchCard from "../components/MatchCard";

export default function HomePage() {
  return (
    <div className="p-6">
      <section className="text-center">
        <h1 className="text-green-400 text-3xl font-bold">PrimePredict</h1>
        <p>Your trusted source for match predictions</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold">Featured Match</h2>
        <MatchCard teamA="Arsenal" teamB="Chelsea" prediction="1X" odds="1.65" />
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold">Today's Top Predictions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <PredictionCard event="Man United vs Liverpool" prediction="Over 2.5" odds="1.85" />
          <PredictionCard event="Barcelona vs Real Madrid" prediction="BTTS" odds="1.70" />
        </div>
      </section>
    </div>
  );
}
