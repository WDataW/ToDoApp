import { useTranslation } from "@/context/Language";
import { KeyboardInput, DateTimePicker, PriorityPicker, Textarea, WarningMessage } from "..";
import { TagsPicker } from ".";
import { useEffect, useState } from "react";
import { getTaskTags } from "./tasks";
import { useTasks } from "@/context/User";
export default function TaskInit({ setNewTask, taskToEdit, className = "", children, ...props }) {
    const t = useTranslation();

    const [dateTime, setDateTime] = useState(new Date(taskToEdit.dueDate));
    const [title, setTitle] = useState(taskToEdit.title);
    const [description, setDescription] = useState(taskToEdit.description);
    const [priority, setPriority] = useState(taskToEdit.priority);
    const [selectedTags, setSelectedTags] = useState(getTaskTags(taskToEdit));

    const [tasks] = useTasks();
    const createdAt = new Date().toISOString();
    const newTaskId = `task:${crypto.randomUUID()}`;
    useEffect(() => {
        setNewTask({
            createdAt,
            id: newTaskId,
            ...taskToEdit,
            title,
            description,
            priority,
            tags: selectedTags.map((tag) => { return tag.id }),
            dueDate: dateTime.toISOString()
        });
    }, [
        dateTime, title, description, priority, selectedTags
    ]);
    return (
        <div className="flex text-[0.9rem] flex-col gap-[0.8rem]">
            <DateTimePicker dateTime={dateTime} setDateTime={setDateTime} />
            <div className="flex flex-col">
                <KeyboardInput value={title} handleChange={(e) => { setTitle(e.target.value) }} label={t("fields.title")} placeholder={t("fields.enterTaskTitle")} className={`sm:max-w-[20rem] ${className}`} {...props} />
                {!title ? <WarningMessage className={"ms-[0.2rem] mt-[0.3rem]"}>{t("warnings.emptyTitle")}</WarningMessage> : <></>}
            </div>
            <Textarea value={description} onChange={(e) => { setDescription(e.target.value) }} className="sm:max-w-[20rem]" label={t("fields.description")} placeholder={t("fields.enterTaskDescription")}></Textarea>
            <PriorityPicker priority={priority} setPriority={setPriority} labelClassName="w-1/2 max-w-[10rem]"></PriorityPicker>
            <TagsPicker selectedTags={selectedTags} setSelectedTags={setSelectedTags}  ></TagsPicker>

        </div>
    );
}