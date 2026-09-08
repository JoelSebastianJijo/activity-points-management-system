import { useApp } from "../context/AppContext";
import { computePointsSummary, categoryLabel } from "../utils";
import categoriesData from "../data/categories.json";
import StatusTag from "../components/StatusTag";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { student, getActivities } = useApp();
  const activities = getActivities(student.uid);
  const { earned, remaining, percent } = computePointsSummary(activities, student.targetPoints);

  const recentActivities = [...activities]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="page">
      <div className="page-heading">
        <h1>Welcome back, {student.name.split(" ")[0]}</h1>
        <p>Here's where your activity points currently stand.</p>
      </div>

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
          <h2>Student Details</h2>
          <dl className="info-list">
            <div>
              <dt>Name</dt>
              <dd>{student.name}</dd>
            </div>
            <div>
              <dt>UID</dt>
              <dd>{student.uid}</dd>
            </div>
            <div>
              <dt>Department</dt>
              <dd>{student.department}</dd>
            </div>
            <div>
              <dt>Semester</dt>
              <dd>{student.semester}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="recent-panel">
        <div className="panel-heading">
          <h2>Recent Activities</h2>
          <Link to="/activities">View all →</Link>
        </div>

        {recentActivities.length === 0 ? (
          <p className="empty-state">No activities logged yet. Add your first one to get started.</p>
        ) : (
          <ul className="recent-list">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="recent-item">
                <div>
                  <p className="recent-title">{activity.title}</p>
                  <p className="recent-meta">
                    {categoryLabel(categoriesData, activity.category)} · {activity.date}
                  </p>
                </div>
                <StatusTag status={activity.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
