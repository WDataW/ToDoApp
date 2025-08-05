export default function MiniTag({ tag, className = "", children, ...props }) {
    return (
        <div className={`flex   items-center ${className}`}{...props}>
            <span className={` inline-block h-[0.6rem] w-[0.6rem] me-[0.1rem] ${tag.icon} rounded-full bg-[length:0.73rem_0.73rem] bg-center bg-no-repeat`} />
            <span className="flex-0 opacity-60 capitalize text-nowrap">{tag.title}</span>
        </div>);
}