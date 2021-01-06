import { useState, useEffect } from 'react'
import './App.css';
import Button from './components/Button'

function App() {
  const [totalNumOfClicks, setTotalNumOfClicks] = useState(0)
  useEffect(() => {
    // thing we want to run when somethign changes
    if(totalNumOfClicks > 0){
      // in case u dont want the thing to run when page refreshes, as useState(0) for totalNumOfClicks counts as a "change"
    }
  }, [/*things we want to subscribe to*/totalNumOfClicks])

  const incrementNumOfClicks = () => {
    setTotalNumOfClicks(totalNumOfClicks + 1)
  }

  return (
    <div className="App">
      <header className="App-header" incrementNumOfClicks={incrementNumOfClicks}>
        <Button title='You have clicked' incrementNumOfClicks={incrementNumOfClicks}/>
        <Button title='Have you tried clicking this?' incrementNumOfClicks={incrementNumOfClicks}/>
        <p>{totalNumOfClicks}</p>
      </header>
    </div>
  );
}

export default App;
