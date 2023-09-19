import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute"
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import AccountDashboard from "./components/AccountDashboard";
import BoardsAll from "./components/BoardsAll";
import Board from "./components/Board";
import NotebooksAll from "./components/NotebooksAll";
import Notebook from "./components/Notebook";
// import Footer from "./components/Footer";

export default function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path="/login" >
            <LoginFormPage />
          </Route>

          <ProtectedRoute exact path='/dashboard'>
            <AccountDashboard />
          </ProtectedRoute>

          <ProtectedRoute exact path='/boards'>
            <BoardsAll />
          </ProtectedRoute>

          <ProtectedRoute exact path='/boards/:boardId'>
            <Board />
          </ProtectedRoute>

          <ProtectedRoute exact path='/notebooks'>
            <NotebooksAll />
          </ProtectedRoute>

          <ProtectedRoute exact path='/notebooks/:notebookId'>
            <Notebook />
          </ProtectedRoute>

          <Route>
            <h1>Route does not exist</h1>
          </Route>
        </Switch>
      )}
      {/* <Footer /> */}
    </>
  )
};
