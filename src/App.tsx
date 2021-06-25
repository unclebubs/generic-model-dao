import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Person } from './entity/Entity'
import fbase from './dao/firebase'
import PersonDAO from './dao/PersonDAO'

const personDAO: PersonDAO = new PersonDAO(fbase)

function App (): React.ReactNode {
  
  
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
