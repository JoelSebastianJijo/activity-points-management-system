import { createContext, useContext, useState, useEffect } from "react";
import studentsData from "../data/students.json";
import activitiesData from "../data/activities.json";

const AppContext = createContext(null);

const STORAGE_KEY = "apms_logged_in_uid";
const ACTIVITIES_STORAGE_KEY = "apms_activities";

export function AppProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [activitiesByUid, setActivitiesByUid] = useState(activitiesData);
  const [loading, setLoading] = useState(true);

  // On first load, restore a previous session and any locally-added
  // activities (since this app has no backend, we persist to
  // localStorage purely so the demo survives a page refresh).
  useEffect(() => {
    const savedUid = localStorage.getItem(STORAGE_KEY);
    if (savedUid) {
      const found = studentsData.find((s) => s.uid === savedUid);
      if (found) {
        setStudent(found);
      }
    }

    const savedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    if (savedActivities) {
      try {
        setActivitiesByUid(JSON.parse(savedActivities));
      } catch {
        setActivitiesByUid(activitiesData);
      }
    }

    setLoading(false);
  }, []);

  const login = (uid, password) => {
    const found = studentsData.find(
      (s) => s.uid.toLowerCase() === uid.trim().toLowerCase() && s.password === password
    );

    if (!found) {
      return { success: false, message: "Invalid UID or password." };
    }

    setStudent(found);
    localStorage.setItem(STORAGE_KEY, found.uid);
    return { success: true };
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getActivities = (uid) => activitiesByUid[uid] || [];

  const addActivity = (uid, activity) => {
    setActivitiesByUid((prev) => {
      const existing = prev[uid] || [];
      const updated = {
        ...prev,
        [uid]: [
          ...existing,
          {
            id: `local-${Date.now()}`,
            status: "Pending",
            pointsApproved: 0,
            ...activity,
          },
        ],
      };
      localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const value = {
    student,
    login,
    logout,
    getActivities,
    addActivity,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
