import React from 'react';
import ReactDOM from "react-dom"
import './index.css';
import Die from "../src/components/die"
import {nanoid} from "nanoid";


function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice(){
    let newDice =[]
    for (let i=0; i < 10; i++){
      newDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      })
        
    }
      return newDice
  }
 

 function rollDice(){
   setDice(allNewDice())
 }
 
function holdDice(id){
  setDice(oldDice => oldDice.map(die => {
    return die.id === id? {...die, isHeld: !die.isHeld} : die
  }))

}
 const diceElements = dice.map(die => (
 <Die 
 key={die.id} 
 isHeld={die.isHeld}
 value={die.value}
 holdDice={() => holdDice(die.id)}
 />))
  return (
    <main>
        <div className='die-container'>
            {diceElements}
        </div>
        <button 
        className='roll-btn'
        onClick={rollDice}
        >Roll</button>
    </main>
  );
}

export default App;
