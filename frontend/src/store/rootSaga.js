import { all } from "redux-saga/effects";

import userSaga from "./Auth/saga";
import petsSaga from "./Pets/saga";

function* rootSaga() {
  yield all([userSaga(), petsSaga()]);
}

export default rootSaga;
