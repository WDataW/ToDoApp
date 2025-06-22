import Button from "./Button";
export default function PinkCircleButton({label, handleClick}){
    return(
        <Button
            bgColor="pink"
            shape="circle"
            label={label}
            handleClick={handleClick}
        />
    );
}