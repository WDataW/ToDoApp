const bgColors={
    pink:"bg-[#FF73FA]",
    blue:"bg-[#5865F2]",
    gray:"bg-[#F0F1F2]"
}
const shapes={
    rect:"rounded-full py-[0.5rem] px-[0.25rem] w-full ",
    circle:"rounded-full aspect-square p-2 w-[2.5em] h-[2.5rem] truncate"
}

export default function Button({bgColor="pink", shape="circle", label="Button", handleClick}){
    return (<button onClick={handleClick} 
                    className={`text-white  text-[1rem] ${bgColors[bgColor]} ${shapes[shape]}`}
            >
                    {label}
            </button>
    );
}