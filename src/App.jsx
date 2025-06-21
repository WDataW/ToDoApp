import { useState } from 'react'
import {BlueRectButton, PinkRectButton, PinkCircleButton} from "./components/ui";
function App() {

  return (
    <>
    <PinkCircleButton label="+"/>
    <PinkRectButton label="Meow" handleClick={()=>{console.log("Meooow")}}/>
    <BlueRectButton handleClick={()=>{console.log("Meow")}}/>
    </>
  );
}
export default App
