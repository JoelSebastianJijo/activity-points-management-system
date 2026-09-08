export function computePointsSummary(activities, targetPoints) {
  const earned = activities.reduce((sum, activity) => sum + (activity.pointsApproved || 0), 0);
  const remaining = Math.max(targetPoints - earned, 0);
  const percent = targetPoints > 0 ? Math.min(Math.round((earned / targetPoints) * 100), 100) : 0;

  return { earned, remaining, percent };
}

export function categoryLabel(categories, categoryId) {
  const found = categories.find((c) => c.id === categoryId);
  return found ? found.label : categoryId;
}
