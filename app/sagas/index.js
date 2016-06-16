import { call, put, take, fork, cancel, race } from 'redux-saga/effects'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
let counter1 = 0;
let counter2 = 0;

function* tickV1() {
  while(true) {
    yield call(delay, 1000);
    const plus = Math.random()*50
    counter1 += plus
    yield put({type: 'TICK_V1', plus });
    if (counter1 >= 100) return true
  }
}

function* tickV2() {
  while(true) {
    yield call(delay, 1000);
    const plus = Math.random()*50
    counter2 += plus
    yield put({type: 'TICK_V2', plus });
    if (counter2 >= 100) return true
  }
}

function* watchRace() {
  while(yield take('START')) {
    const {v1, v2} = yield race({
      v1: call(tickV1),
      v2: call(tickV2)
    })
    yield put({type: 'STOP'})

    if (v1) {
      yield put({type: 'V1_WIN'})

    } else {
      yield put({type: 'V2_WIN'})
    }
  }
}

function* reset() {
  while(yield take('RESET')) {
    counter1 = 0
    counter2 = 0
  }
}

export default function* root() {
  yield [
    fork(watchRace),
    fork(reset)
  ]
}