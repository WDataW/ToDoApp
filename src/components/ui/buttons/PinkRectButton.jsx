import Button from "./Button";
export default function PinkRectButton({label, handleClick}){
    return(
        <Button
            bgColor="pink"
            shape="rect"
            label={label}
            handleClick={handleClick}
        />
    );
}