export default function Achievement({ achievement, className = "", children, ...props }) {
    return (
        <div className={`${className} flex flex-col items-center justify-center `} {...props}>
            <img className="max-w-[5.5rem] mb-[0.2rem]" src={achievement.icon} alt="" />
            <p className="text-nowrap font-bold">{achievement.title}</p>
        </div>
    );
}