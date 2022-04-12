import React from 'react';
import ReactDOM from "react-dom"
import './index.css';
import Die from "../src/components/die"
import {nanoid} from "nanoid";
import Confetti from "react-confetti"


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

function generateDice(){
  return (
    {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  )
}

React.useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)

  if(allHeld && allSameValue){
    setTenzies(true)
    console.log("You won")
  }
}, [dice])

function allNewDice(){
    let newDice =[]
    for (let i=0; i < 10; i++){
      newDice.push(generateDice())
        
    }
      return newDice
  }
 

function rollDice(){
  if(tenzies){
    setDice(allNewDice())
  }else {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld? die: generateDice()
    }))
  }
  
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
        {tenzies && <Confetti></Confetti>}
        <h1>Tenzies</h1>
        <p>Roll untill all dice are the same. Click each die to freeze it as its current value between rolls.</p>
        <div className='die-container'>
            {diceElements}
        </div>
        <button 
        className='roll-btn'
        onClick={rollDice}
        >{tenzies? "New Game": "Roll" }</button>
    </main>
  );
}

export default App;
