import test from 'tape';

import { put, call, take, fork, race } from 'redux-saga/effects'
import { watchRace, tickV1, tickV2, reset, delay, getPlus } from '../app/sagas'

test('watchRace v1 win flow Saga test', (t) => {
  const generator = watchRace()
  const expectedRace = race({
    v1 : call(tickV1),
    v2 : call(tickV2)
  })
  const v1Win = true

  t.deepEqual(
    generator.next().value,
    take('START'),
    'watchRace Saga must wait START action'
  )

  t.deepEqual(
    generator.next().value,
    expectedRace,
    'watchRace Saga must wait for race( tickV1, tickV2 )'
  )

  t.deepEqual(
    generator.next({v1: v1Win}).value,
    put({type: 'STOP'}),
    'watchRace Saga must put STOP action'
  )

  t.deepEqual(
    generator.next({v1: v1Win}).value,
    put({type: 'V1_WIN'}),
    'watchRace Saga must put V1_WIN action'
  )

  t.deepEqual(
    generator.next().value,
    take('START'),
    'watchRace Saga must go back to beginning of loop'
  )

  t.end()
});

test('watchRace v2 win flow Saga test', (t) => {
  const generator = watchRace()
  const expectedRace = race({
    v1 : call(tickV1),
    v2 : call(tickV2)
  })
  const v2Win = false

  t.deepEqual(
    generator.next().value,
    take('START'),
    'watchRace Saga must wait START action'
  )

  t.deepEqual(
    generator.next().value,
    expectedRace,
    'watchRace Saga must wait for race( tickV1, tickV2 )'
  )

  t.deepEqual(
    generator.next({v1: v2Win}).value,
    put({type: 'STOP'}),
    'watchRace Saga must put STOP action'
  )

  t.deepEqual(
    generator.next({v1: v2Win}).value,
    put({type: 'V2_WIN'}),
    'watchRace Saga must put V2_WIN action'
  )

  t.deepEqual(
    generator.next().value,
    take('START'),
    'watchRace Saga must go back to beginning of loop'
  )

  t.end()
});

test('tickV1 Saga test', (t) => {
  const generator = tickV1()
  const mockPlus = 10

  t.deepEqual(
    generator.next().value,
    call(delay, 1000),
    'tickV1 Saga must call delay(1000)'
  )

  t.deepEqual(
    generator.next().value,
    call(getPlus),
    'tickV1 Saga must call getPlus()'
  )

  t.deepEqual(
    generator.next(mockPlus).value,
    put({type: 'TICK_V1', plus: mockPlus}),
    'tickV1 Saga must put TICK_V1 action'
  )

  t.deepEqual(
    generator.next(mockPlus).value,
    call(delay, 1000),
    'tickV1 Saga must go back to beginning of loop'
  )

  t.end()
});

test('tickV2 Saga test', (t) => {
  const generator = tickV2()
  const mockPlus = 10

  t.deepEqual(
    generator.next().value,
    call(delay, 1000),
    'tickV2 Saga must call delay(1000)'
  )

  t.deepEqual(
    generator.next().value,
    call(getPlus),
    'tickV2 Saga must call getPlus()'
  )

  t.deepEqual(
    generator.next(mockPlus).value,
    put({type: 'TICK_V2', plus: mockPlus}),
    'tickV2 Saga must put TICK_V2 action'
  )

  t.deepEqual(
    generator.next(mockPlus).value,
    call(delay, 1000),
    'tickV2 Saga must go back to beginning of loop'
  )

  t.end()
});

test('reset Saga test', (t) => {
  const generator = reset()

  t.deepEqual(
    generator.next().value,
    take('RESET'),
    'reset Saga wait RESET action'
  )

  t.deepEqual(
    generator.next().value,
    take('RESET'),
    'reset Saga must go back to beginning of loop'
  )

  t.end()
});