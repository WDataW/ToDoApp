import Button from "./Button";
export default function PinkRectButton({label, handleClick}){
    return(<Button color="pink" shape="rect" label={label} handleClick={handleClick}/>);
}