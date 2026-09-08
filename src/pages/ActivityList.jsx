import { useState } from "react";
import { useApp } from "../context/AppContext";
import { categoryLabel } from "../utils";
import categoriesData from "../data/categories.json";
import StatusTag from "../components/StatusTag";

export default function ActivityList() {
  const { student, getActivities } = useApp();
  const activities = getActivities(student.uid);
  const [filter, setFilter] = useState("all");

  const filteredActivities =
    filter === "all" ? activities : activities.filter((activity) => activity.category === filter);

  const sortedActivities = [...filteredActivities].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="page">
      <div className="page-heading">
        <h1>Activity List</h1>
        <p>All co-curricular and extra-curricular activities you've submitted.</p>
      </div>

      <div className="filter-row">
        <button
          className={`filter-chip ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        {categoriesData.map((category) => (
          <button
            key={category.id}
            className={`filter-chip ${filter === category.id ? "active" : ""}`}
            onClick={() => setFilter(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {sortedActivities.length === 0 ? (
        <p className="empty-state">No activities found for this category.</p>
      ) : (
        <div className="activity-table">
          <div className="activity-row activity-row-head">
            <span>Activity</span>
            <span>Category</span>
            <span>Date</span>
            <span>Claimed</span>
            <span>Approved</span>
            <span>Status</span>
          </div>

          {sortedActivities.map((activity) => (
            <div className="activity-row" key={activity.id}>
              <span className="activity-title-cell" data-label="Activity">
                {activity.title}
              </span>
              <span data-label="Category">{categoryLabel(categoriesData, activity.category)}</span>
              <span data-label="Date">{activity.date}</span>
              <span data-label="Claimed">{activity.pointsClaimed}</span>
              <span data-label="Approved">{activity.pointsApproved}</span>
              <span data-label="Status">
                <StatusTag status={activity.status} />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
