import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import categoriesData from "../data/categories.json";

const emptyForm = {
  title: "",
  category: categoriesData[0]?.id || "",
  date: "",
  description: "",
  pointsClaimed: "",
};

export default function AddActivity() {
  const { student, addActivity } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Activity title is required.";
    if (!form.date) newErrors.date = "Please select a date.";
    if (!form.pointsClaimed || Number(form.pointsClaimed) <= 0) {
      newErrors.pointsClaimed = "Enter a points value greater than 0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    addActivity(student.uid, {
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      description: form.description.trim(),
      pointsClaimed: Number(form.pointsClaimed),
    });

    setForm(emptyForm);
    setSubmitted(true);
  };

  return (
    <div className="page">
      <div className="page-heading">
        <h1>Add Activity</h1>
        <p>Submit a new activity for approval.</p>
      </div>

      <form className="activity-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="title">Activity Title</label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={handleChange("title")}
            placeholder="e.g. National Level Hackathon"
          />
          {errors.title && <p className="form-message error">{errors.title}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select id="category" value={form.category} onChange={handleChange("category")}>
            {categoriesData.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="date">Date</label>
          <input id="date" type="date" value={form.date} onChange={handleChange("date")} />
          {errors.date && <p className="form-message error">{errors.date}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={form.description}
            onChange={handleChange("description")}
            placeholder="Briefly describe the activity"
            rows={4}
          />
        </div>

        <div className="form-field">
          <label htmlFor="pointsClaimed">Points Claimed</label>
          <input
            id="pointsClaimed"
            type="number"
            min="1"
            value={form.pointsClaimed}
            onChange={handleChange("pointsClaimed")}
            placeholder="e.g. 10"
          />
          {errors.pointsClaimed && <p className="form-message error">{errors.pointsClaimed}</p>}
        </div>

        {submitted && (
          <p className="form-message success">
            Activity submitted for approval.{" "}
            <button type="button" className="link-button" onClick={() => navigate("/activities")}>
              View activity list →
            </button>
          </p>
        )}

        <button type="submit" className="btn-primary">
          Submit Activity
        </button>
      </form>
    </div>
  );
}
