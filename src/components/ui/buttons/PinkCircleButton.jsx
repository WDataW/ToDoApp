import Button from "./Button";
export default function PinkCircleButton({children, handleClick}){
    return(
        <Button
            bgColor="pink"
            shape="circle"
            handleClick={handleClick}
        >
            {children}
        </Button>
    );
}