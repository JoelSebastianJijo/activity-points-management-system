import { useApp } from "../context/AppContext";
import { computePointsSummary } from "../utils";
import categoriesData from "../data/categories.json";

export default function Profile() {
  const { student, getActivities } = useApp();
  const activities = getActivities(student.uid);
  const { earned, remaining, percent } = computePointsSummary(activities, student.targetPoints);

  const countsByCategory = categoriesData.map((category) => ({
    ...category,
    count: activities.filter((activity) => activity.category === category.id).length,
  }));

  return (
    <div className="page">
      <div className="page-heading">
        <h1>Profile</h1>
        <p>Your student record and overall activity points summary.</p>
      </div>

      <section className="profile-card">
        <div className="profile-avatar">{student.name.charAt(0)}</div>

        <div>
          <h2>{student.name}</h2>
          <p className="profile-meta">
            {student.uid} · {student.department} · Semester {student.semester}
          </p>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="points-panel">
          <div className="points-ring" style={{ "--percent": `${percent}%` }}>
            <span className="points-ring-value">{percent}%</span>
          </div>

          <div className="points-figures">
            <div>
              <span className="figure-value">{earned}</span>
              <span className="figure-label">Earned</span>
            </div>
            <div>
              <span className="figure-value">{student.targetPoints}</span>
              <span className="figure-label">Target</span>
            </div>
            <div>
              <span className="figure-value">{remaining}</span>
              <span className="figure-label">Remaining</span>
            </div>
          </div>
        </section>

        <section className="info-panel">
          <h2>Activities by Category</h2>
          <ul className="category-breakdown">
            {countsByCategory.map((category) => (
              <li key={category.id}>
                <span>{category.label}</span>
                <span className="category-count">{category.count}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
