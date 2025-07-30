import TaskCategory from "./TaskCategory";
import { SearchInput } from "../keyboardInputs";
import { getAllTags } from "./tasks";
import { useEffect, useState } from "react";
import { useTranslation } from "../../../context/Language";
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
        document.querySelector(".tags-list li button").click();// to start with 'All' tag
    }, []);


    function handleSearchChange(e) {
        setTagsFilter(e.target.value)
    }
    const t = useTranslation();
    const allTags = getAllTags();
    const [tagsFilter, setTagsFilter] = useState("");
    const filteredTags = allTags.filter((tag) => tag.title.toLowerCase().startsWith(tagsFilter.toLowerCase()));
    return (
        <section className={className}>
            <SearchInput required={false} value={tagsFilter} handleChange={handleSearchChange} placeholder={t("terms.searchTag")} className="mb-[0.9rem] max-w-[20rem]"></SearchInput>
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