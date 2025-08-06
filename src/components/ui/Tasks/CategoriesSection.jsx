import TaskCategory from "./TaskCategory";
import { SearchInput } from "../keyboardInputs";
import { getAllTags } from "./tasks";
import { useEffect, useState } from "react";
import { useTranslation } from "../../../context/Language";
import { useTheme, bgThemeColors } from "@/context/Theme";
export default function CategoriesSection({ activeTags, setActiveTags, className = "", children, ...props }) {

    function handleTagClick(e) {
        const currentTag = e.currentTarget.id;
        if (!activeTags.includes(currentTag)) {
            setActiveTags([...activeTags, currentTag]);
            return;
        }
        if (activeTags.length !== 1) setActiveTags(activeTags.filter((tag) => tag !== currentTag));
    }
    useEffect(() => {
        document.querySelector(".tags-list li button").click();// to start with 'Active' tag
    }, []);


    function handleSearchChange(e) {
        setTagsFilter(e.target.value)
    }
    const t = useTranslation();
    const [theme] = useTheme();
    const allTags = getAllTags();
    const [tagsFilter, setTagsFilter] = useState("");
    const filteredTags = allTags.filter((tag) => tag.title.toLowerCase().startsWith(tagsFilter.toLowerCase()));
    return (
        <section className={className}>
            <div className="flex gap-[0.4rem]">
                <SearchInput required={false} value={tagsFilter} handleChange={handleSearchChange} placeholder={t("fields.searchTag")} className="text-[0.9rem] mb-[0.5rem] max-w-[20rem]"></SearchInput>
                <button className={`${bgThemeColors[theme]} text-white text-[0.9rem] h-[2.10rem] outline-none  px-[0.8rem]  rounded-[0.4rem] text-nowrap `}>
                    Create Tag
                </button>
            </div>
            {filteredTags.length == 0 && <p>{t("terms.noMatchingTags")}</p>}
            <ul className="tags-list gap-3 flex items-center justify-start pb-[0.3rem] overflow-x-auto h-[7.5rem]">
                {filteredTags.map((tag, i) =>
                    <li key={i}>
                        <TaskCategory i={i} active={activeTags} handleClick={handleTagClick} tag={tag} className="min-w-[10rem]" />
                    </li>
                )}
            </ul>
        </section>
    );
}