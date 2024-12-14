export function calculateRank(score) {
  switch (true) {
    case (score >= 1000):
      return "Prodigy";
    case (score >= 750):
      return "Expert";
    case (score >= 500):
      return "Scholar";
    case (score >= 250):
      return "Apprentice";
    default:
      return "Novice";
  }
}