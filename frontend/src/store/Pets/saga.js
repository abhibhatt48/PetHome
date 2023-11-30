import { all, put, takeLatest } from "redux-saga/effects";
import {
  GET_DONATIONS,
  GET_DONATIONS_FAIL,
  GET_DONATIONS_SUCCESS,
  GET_PETS,
  GET_PETS_FAIL,
  GET_PETS_SUCCESS,
  SET_PETS_LOADING,
} from "./actionTypes";
import axios from "../../utils/axios";

function* getPetsSaga({ params }) {
  try {
    yield put({ type: SET_PETS_LOADING });
    const { data } = yield axios.get(params ? `/pet?search=${params}` : "/pet");
    if (data.success) {
      yield put({
        type: GET_PETS_SUCCESS,
        payload: data.data,
      });
    } else {
      yield put({ type: GET_PETS_FAIL, message: data.message });
    }
  } catch (error) {
    yield put({ type: GET_PETS_FAIL, message: "Something went wrong." });
  }
}

function* getDonationsSaga() {
  try {
    yield put({ type: SET_PETS_LOADING });
    const { data } = yield axios.get("/pet/donations");
    if (data.success) {
      yield put({
        type: GET_DONATIONS_SUCCESS,
        payload: data.data,
      });
    } else {
      yield put({ type: GET_DONATIONS_FAIL, message: data.message });
    }
  } catch (error) {
    yield put({ type: GET_DONATIONS_FAIL, message: "Something went wrong." });
  }
}

function* petSaga() {
  yield all([
    yield takeLatest(GET_PETS, getPetsSaga),
    yield takeLatest(GET_DONATIONS, getDonationsSaga),
  ]);
}

export default petSaga;
