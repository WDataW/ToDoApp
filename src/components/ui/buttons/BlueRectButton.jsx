import Button from "./Button";
export default function BlueRectButton({label, handleClick}){
    return(<Button color="blue" shape="rect" label={label} handleClick={handleClick}/>);
}