import { bgThemeColors } from "../../../context/Theme";

const shapes={
    rect:"rounded-md py-[0.5rem] px-[0.25rem] w-full ",
    circle:"rounded-full aspect-square p-2 w-[2.5em] h-[2.5rem] truncate"
}

export default function Button({theme = "dark", shape="rect", type="", disabled=false ,children, handleClick, className="", ...props }){
    return (<button onClick={handleClick} 
                type={type}
                disabled={disabled}
                className={`text-white text-[1rem] ${bgThemeColors[theme]} ${shapes[shape]} ${className} ${disabled?"opacity-50 ":"cursor-pointer"} `}
                {...props}
            >
                    {children}
            </button>
    );
}