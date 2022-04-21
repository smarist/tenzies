import React from 'react';
import './index.css';
import Die from "../src/components/die"
import {nanoid} from "nanoid";
import Confetti from "react-confetti"
import Timer from './components/timer';


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [score, setScore] = React.useState(0)

function generateDice(){
  return (
    {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  )
}

const allHeld = dice.every(die => die.isHeld)
const firstValue = dice[0].value
const allSameValue = dice.every(die => die.value === firstValue)

React.useEffect(() => {
  if(allHeld && allSameValue){
    setTenzies(true)
    console.log("You won")
    localStorage.setItem("score", JSON.stringify(score))
     if(firstValue === 6){
      setScore(prevScore => 60)
     }else if(firstValue === 5){
      setScore(prevScore => 50)
     }else if(firstValue === 4){
      setScore(prevScore => 40)
     }else if(firstValue === 3){
      setScore(prevScore => 30)
     }else if(firstValue === 2){
      setScore(prevScore => 20)
     }else if(firstValue === 1){
      setScore(prevScore => 10)
     }
  } else {
    setScore(prevScore => 0)
  }
}, [dice])

function allNewDice(){
    let newDice =[]
    for (let i=0; i < 10; i++){
      newDice.push(generateDice())
        
    }
      return newDice
  }
 
console.log(score)

function saveScore(){
  if(allHeld && allSameValue){
    console.log("saved")
    localStorage.setItem("score", JSON.stringify(score))
}
}

function rollDice(){
  if(!tenzies){
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld? die: generateDice()
  }))
 } else {
  setTenzies(false)
  setDice(allNewDice())
} 
  
}
 
function holdDice(id){
  setDice(oldDice => oldDice.map(die => {
    return die.id === id ? {...die, isHeld: !die.isHeld} : die
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
        {tenzies && 
        <div className='win-section'>
          <h3 className='won'>You won !!!</h3>
          <h3 className='score'>You scored {score}</h3>
        </div>
        }
        {!allSameValue && allHeld && <div><h3 className='wrong'>Wrong match, read the rules again</h3></div>}
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll untill all dice are the same. Click each die to freeze it as its current value between rolls.</p>
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
