import React, { Component, PropTypes } from 'react'
import './styles.styl'

const Race = ({ v1, v2, msg, status, actions }) =>
      <div className='block'>
          <div className='msgBlock'>V1 :
            { v1 === 0 ? null : renderProgress(Math.floor(v1))}
          </div>
          <div className='msgBlock'>V2 :
            { v2 === 0 ? null : renderProgress(Math.floor(v2))}
          </div>
        <div className='alertBlock'>
          {msg}
        </div>
        <div className='block'>
          <button className='Btn' disabled={status === 'Running' || msg} onClick={actions.start}>
            Start
          </button>
          <button className='Btn' disabled={status === 'Running' || !msg} onClick={actions.reset}>
            Reset
          </button>
        </div>
      </div>

const renderProgress = value =>
  <progress value={Math.floor(value)} max="100"></progress>

Race.propTypes = {
  v1: PropTypes.number.isRequired,
  v2: PropTypes.number.isRequired,
  msg: PropTypes.string,
  status: PropTypes.oneOf(['Running', 'Stopped']),
  actions: PropTypes.shape({
    start: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  })
}

export default Race
