import { numToArabic, useLang } from "@/context/Language";

export default function ProgressBar({ numerator, denominator, className = "", children, ...props }) {
    const progress = numerator / denominator * 100;
    const [lang] = useLang();
    const ratio = lang == "ar" ? numToArabic(numerator + " / " + denominator) : numerator + " / " + denominator;
    return (
        <div className={`${className} w-full`} {...props}>
            <p className="text-[0.7rem] w-full text-start">{ratio}</p>
            <div className="relative">
                <div style={{ width: `${progress}%` }} className="absolute top-0 start-0 bg-green-400 w- h-[0.2rem]"></div>
                <div className="bg-gray-600 w-full h-[0.2rem]"></div>
            </div>
        </div>
    );
}