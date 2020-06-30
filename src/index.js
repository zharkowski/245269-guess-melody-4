import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import settings from "./mocks/settings";
import questions from "./mocks/questions";

ReactDOM.render(
    <App
      errorsCount={settings.ERRORS_COUNT}
      questions={questions}
    />,
    document.getElementById(`root`)
);
