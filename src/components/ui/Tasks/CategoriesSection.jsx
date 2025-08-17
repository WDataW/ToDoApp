import TaskCategory from "./TaskCategory";
import { SearchInput } from "../keyboardInputs";
import { useAllTags } from "./tasks";
import { useState } from "react";
import { useTranslation } from "../../../context/Language";
import { CreateTagButton } from "../buttons";

export default function CategoriesSection({ activeTags, setActiveTags, className = "", children, ...props }) {

    function handleTagClick(e) {
        const currentTag = e.currentTarget.id;
        if (!activeTags.includes(currentTag)) {
            setActiveTags([...activeTags, currentTag]);
            return;
        }
        if (activeTags.length !== 1) setActiveTags(activeTags.filter((tag) => tag !== currentTag));
    }


    function handleSearchChange(e) {
        setTagsFilter(e.target.value)
    }
    const t = useTranslation();
    const [allTags] = useAllTags();
    const [tagsFilter, setTagsFilter] = useState("");
    let filteredTags = allTags;
    if (allTags.length !== 0) {
        filteredTags = allTags.filter((tag) => tag.title.toLowerCase().startsWith(tagsFilter.toLowerCase()));
    }
    return (
        <section className={className}>
            <div className="flex gap-[0.4rem]">
                <SearchInput required={false} value={tagsFilter} handleChange={handleSearchChange} placeholder={t("fields.searchTag")} className="text-[0.9rem] mb-[0.3rem] max-w-[20rem]"></SearchInput>
                <CreateTagButton activeTags={activeTags} setActiveTags={setActiveTags} className={`text-[0.9rem] h-[2.10rem] outline-none  px-[0.8rem] text-nowrap `}>
                </CreateTagButton>
            </div>
            {filteredTags.length == 0 && <p>{t("terms.noMatchingTags")}</p>}
            <ul className="tags-list gap-[0.6rem] flex items-center justify-start  overflow-x-auto h-[7rem]">
                {filteredTags.map((tag, i) =>
                    <li key={tag.id}>
                        <TaskCategory i={i} active={activeTags} setActiveTags={setActiveTags} handleClick={handleTagClick} tag={tag} className="min-w-[10rem]" />
                    </li>
                )}
            </ul>
        </section>
    );
}