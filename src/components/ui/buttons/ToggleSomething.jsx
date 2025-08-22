import { ToggleButton } from ".";

export default function ToggleSomething({ value, label, className = "", children, ...props }) {

    return (
        <div className={`${className} flex-wrap flex items-center  justify-between gap-x-[1rem]`} >
            <p>{label}</p>
            <ToggleButton value={value}  {...props}></ToggleButton>
        </div>
    );
}