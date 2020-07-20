import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import settings from "./mocks/settings";
import questions from "./mocks/questions";
import {createStore} from "redux";
import {reducer} from "./reducer";
import {Provider} from "react-redux";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App
        errorsCount={settings.ERRORS_COUNT}
        questions={questions}
      />
    </Provider>,
    document.getElementById(`root`)
);
