import { useEffect } from "react";

const Reminder = () => {
  useEffect(() => {
    const reminder = setTimeout(() => {
      alert("⏰ Don't forget to complete your habits today!");
    }, 5000); // Reminder after 5 seconds (adjust in production)

    return () => clearTimeout(reminder);
  }, []);

  return null;
};

export default Reminder;
