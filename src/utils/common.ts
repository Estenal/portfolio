export const getProficiencyLabel = (percentage: number): string => {
  if (percentage >= 90) return "Expert";
  if (percentage >= 75) return "Proficient";
  if (percentage >= 50) return "Intermediate";
  if (percentage >= 25) return "Beginner";
  return "Novice";
};
