import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider } from '../src/context/auth.context';

// Pages
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Private from "./pages/Private/Private";
import Dictionary from "./pages/Dictionary/Dictionary";
import KanjiDetails from "./pages/KanjiDetails/Kanji.details";
import Resources from "./pages/Resources/Resources";
import Quiz from "./pages/QuizPage/QuizPage";

// Components
import Navbar from "./components/Navbar/Navbar";
import AnonRoute from "./components/AnonRoute/AnonRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App () {

    return (
      <AuthProvider>
      <div className="container">
        <Navbar />

        <Switch>
         {/* <Route exact path="/">
           <Redirect to="/lessons" />

         </Route> */}

          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path="/lessons" component={Home} />
          <PrivateRoute exact path="/resources" component={Resources} />

          <PrivateRoute exact path="/lessons/:lessonId" component={KanjiDetails} />

          <PrivateRoute exact path="/private" component={Private} />
          <PrivateRoute exact path="/dictionary" component={Dictionary} />
          <PrivateRoute exact path="/quiz" component={Quiz} />
        </Switch>
      </div>
      </AuthProvider>
    );
  }

export default App;
