import PropTypes from "prop-types";
import HabitItem from "./HabitItem";

const HabitList = ({ habits = [], toggleHabit, deleteHabit }) => {
  return (
    <div>
      {habits.length > 0 ? (
        habits.map((habit, index) => {
          const progress = habits.length
            ? (habits.filter((habit) => habit.completed).length /
                habits.length) *
              100
            : 0;
          return (
            <div key={index} className="habit-text">
              <HabitItem
                habit={habit}
                toggleHabit={() => toggleHabit(index)}
                deleteHabit={() => deleteHabit(index)}
              />
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No habits added yet. Start tracking!</p>
      )}
    </div>
  );
};

HabitList.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      streak: PropTypes.number,
    })
  ).isRequired,
  toggleHabit: PropTypes.func.isRequired,
  deleteHabit: PropTypes.func.isRequired,
};

export default HabitList;
