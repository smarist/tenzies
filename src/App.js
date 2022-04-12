import React from 'react';
import ReactDOM from "react-dom"
import './index.css';
import Die from "../src/components/die"


function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice(){
    let newDice =[]
    for (let i=0; i < 10; i++){
      newDice.push(Math.floor(Math.random() * 6) + 1)
    }
      return newDice
  }
 console.log(allNewDice())

 

 const diceElements = dice.map(die => <Die value={die}/>)
  return (
    <main>
        <div className='die-container'>
            {diceElements}
        </div>
        
    </main>
  );
}

export default App;
