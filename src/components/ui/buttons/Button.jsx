import { useTheme } from "../../../context/Theme";

const bgColors={
    orange:"bg-[#F97316]",
    blue:"bg-[#3B82F6]",
    gray:"bg-[#F0F1F2]"
}
const shapes={
    rect:"rounded-md py-[0.5rem] px-[0.25rem] w-full ",
    circle:"rounded-full aspect-square p-2 w-[2.5em] h-[2.5rem] truncate"
}

export default function Button({bgColor="blue", shape="rect", label="Button", handleClick, className="" }){
    return (<button onClick={handleClick} 
                    className={`text-white text-[1rem] ${bgColors[bgColor]} ${shapes[shape]} ${className}`}
            >
                    {label}
            </button>
    );
}