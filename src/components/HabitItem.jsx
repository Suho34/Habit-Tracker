import PropTypes from "prop-types";
const HabitItem = ({ habit = [], toggleHabit, deleteHabit }) => {
  return (
    <div className={`habit-item ${habit.completed ? "completed" : ""}`}>
      <span>
        {habit.name} - Streak: {habit.streak || 0} 🔥 - Points:{" "}
        {habit.points || 0} 🎯
      </span>
      <div className="btn-container">
        <button className="toggle-btn" onClick={toggleHabit}>
          {habit.completed ? "Undo" : "Done"}
        </button>
        <button className="delete-btn" onClick={deleteHabit}>
          ❌
        </button>
      </div>
    </div>
  );
};

HabitItem.propTypes = {
  habit: PropTypes.shape({
    name: PropTypes.string,
    completed: PropTypes.bool,
    streak: PropTypes.number,
  }),
  toggleHabit: PropTypes.func.isRequired,
  deleteHabit: PropTypes.func.isRequired,
};
export default HabitItem;
