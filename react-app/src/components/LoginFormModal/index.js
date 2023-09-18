import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { login } from "../../store/session";
import "./LoginForm.css";

export default function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push(`/dashboard`);
    }
  };

  const handleDemoUser = async (e) => {
    e.preventDefault()
    let demoEmail = 'demo@aa.io'
    let demoPassword = 'password'
    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push(`/dashboard`);
    }
  };

  return (
    <div id='modal-login-signup'>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <label>
          Email:
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </label>
        <label>
          Password:
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </label>
        <button type="submit">
          Log in
        </button>
      </form>
      <div id='demoUserBtnDiv'>
        <button id='demo-user-btn' onClick={handleDemoUser}>
          Log in as demo user
        </button>
      </div>
    </div>
  )
};
