import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Streak from "../assets/streak.svg";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <div>
        <h1>
          {" "}
          <img
            src={Streak}
            style={{
              width: "30px",
              height: "30px",
              margin: "0 10px",
              borderRadius: "50%",
              objectFit: "cover",
              verticalAlign: "middle",
            }}
          />{" "}
          Streak Master
        </h1>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
