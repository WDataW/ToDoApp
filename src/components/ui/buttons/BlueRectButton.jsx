import Button from "./Button";
export default function BlueRectButton({label, handleClick}){
    return(
        <Button
            bgColor="blue"
            shape="rect"
            label={label}
            handleClick={handleClick}
        />
    );
}