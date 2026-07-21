export default function PredictionCard({ event, prediction, odds }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-green-400">{event}</h3>
      <p>Prediction: {prediction}</p>
      <p>Odds: {odds}</p>
    </div>
  );
}
