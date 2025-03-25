import { useState, useEffect } from "react";
import HabitList from "./HabitList";
import Reminder from "./Reminder";

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [reward, setReward] = useState(""); // New state for reward
  const [habitInput, setHabitInput] = useState("");
  const [buttonText, setButtonText] = useState("Add Habit");

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    const savedPoints = JSON.parse(localStorage.getItem("totalPoints")) || 0;
    setHabits(savedHabits);
    setTotalPoints(savedPoints);
  }, []);

  // Function to determine reward automatically
  useEffect(() => {
    if (totalPoints >= 500) setReward("🏆 Gold Medal");
    else if (totalPoints >= 300) setReward("🥈 Silver Medal");
    else if (totalPoints >= 100) setReward("🥉 Bronze Medal");
    else setReward(""); // No reward if below 100
  }, [totalPoints]); // Runs whenever totalPoints changes

  const updateLocalStorage = (newHabits, newPoints) => {
    setHabits(newHabits);
    setTotalPoints(newPoints);
    localStorage.setItem("habits", JSON.stringify(newHabits));
    localStorage.setItem("totalPoints", JSON.stringify(newPoints));
  };

  const addHabit = () => {
    if (habitInput.trim()) {
      const newHabit = {
        name: habitInput,
        completed: false,
        streak: 0,
        points: 0,
        lastCompleted: null,
      };
      updateLocalStorage([...habits, newHabit], totalPoints);
      setHabitInput("");
      setButtonText("Added");

      setTimeout(() => {
        setButtonText("Add Habit");
      }, 2000);
    }
  };

  const toggleHabit = (index) => {
    const newHabits = habits.map((habit, i) => {
      if (i === index) {
        const today = new Date().toISOString().split("T")[0];

        if (habit.lastCompleted === today) return habit; // Prevent multiple completions

        let newStreak = habit.streak || 0;
        let newPoints = habit.points || 0;

        if (habit.completed) {
          newStreak = 0; // Reset streak on unchecking
          newPoints -= 10; // Deduct points when undoing
        } else {
          const lastDate = new Date(habit.lastCompleted || "");
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          // Maintain streak if yesterday was completed
          if (lastDate.toDateString() === yesterday.toDateString()) {
            newStreak += 1;
          } else {
            newStreak = 1; // Reset streak if skipped
          }

          newPoints += 10; // Earn 10 points per completion
        }

        return {
          ...habit,
          completed: !habit.completed,
          lastCompleted: today,
          streak: newStreak,
          points: newPoints,
        };
      }
      return habit;
    });

    const updatedPoints = newHabits.reduce(
      (sum, habit) => sum + (habit.points || 0),
      0
    );
    updateLocalStorage(newHabits, updatedPoints);
  };

  const deleteHabit = (index) => {
    const newHabits = habits.filter((_, i) => i !== index);
    const updatedPoints = newHabits.reduce(
      (sum, habit) => sum + (habit.points || 0),
      0
    );
    updateLocalStorage(newHabits, updatedPoints);
  };

  return (
    <>
      <div className="habit-container">
        <h4>Stay on top of your streaks and build discipline.</h4>

        <input
          type="text"
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}
          placeholder="Enter a new habit"
        />
        <button onClick={addHabit}>{buttonText}</button>
        <Reminder />
      </div>

      <div className="points">
        <h3>Total Points: {totalPoints} 🎯</h3>
        <h4>Level: {Math.floor(totalPoints / 100) + 1} 🚀</h4>
        {reward && <h4 className="reward">New Reward: {reward} 🎉</h4>}{" "}
        {/* Show reward dynamically */}
      </div>

      <div className="habits">
        <HabitList
          habits={habits}
          toggleHabit={toggleHabit}
          deleteHabit={deleteHabit}
        />
      </div>
    </>
  );
};

export default HabitTracker;
