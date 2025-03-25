import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  }
  async function handleGoogleLogin(e) {
    e.preventDefault();
    try {
      await googleLogin();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>

      <button onClick={handleGoogleLogin} className="google-btn">
        Sign Up with Google
      </button>
    </div>
  );
};

export default Signup;
