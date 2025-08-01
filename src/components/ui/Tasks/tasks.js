import { useTasks } from "../../../context/User";
import { useTheme } from "../../../context/Theme";
import { useLang, useTranslation } from "../../../context/Language";
import { dateFormatters, timeFormatters } from "../../../scripts/dateTime";

export function loopFilterTasks(tasks, filterKeys, filterType) {
    if (filterKeys.length == 0) {
        return tasks;
    }
    const t = useTranslation();
    let newTasks = tasks;
    const includeCompleted = filterKeys.includes(t("terms.completed"));
    for (let filter of filterKeys) {
        newTasks = filterTasks(newTasks, filter, filterType, includeCompleted);
    }
    return newTasks
}
export function filterTasks(tasks, filterKey, filterType, includeCompleted) {
    const t = useTranslation();
    filterKey = filterKey.toLowerCase();
    const [lang] = useLang();
    if (filterKey == t("terms.completed").toLowerCase()) {
        return tasks.filter((task) => task.status == "completed");
    } else if (filterKey == "today") {
        const nowDate = dateFormatters[lang](new Date());
        const todayTasks = tasks.filter(
            (task) => {
                const dueDate = dateFormatters[lang](new Date(task.dueDate));
                console.log(includeCompleted);
                return (dueDate == nowDate) && (task.status !== "completed" || includeCompleted);
            }
        );
        return todayTasks;

    } else if (filterKey == t("titles.tomorrow")) {
        const tmrwDate = new Date();
        tmrwDate.setDate(tmrwDate.getDate() + 1);
        const tomorrowTasks = tasks.filter(
            (task) => {
                const dueDate = new Date(task.dueDate);
                return (dueDate.getFullYear() == tmrwDate.getFullYear() &&
                    dueDate.getMonth() == tmrwDate.getMonth() &&
                    dueDate.getDate() == tmrwDate.getDate()) &&
                    (task.status !== "completed" || includeCompleted);
            })
        return tomorrowTasks;

    } else if (filterKey == t("titles.overdue").toLowerCase()) {
        const nowDate = new Date();
        const overdueTasks = tasks.filter(
            (task) => {
                const dueDate = new Date(task.dueDate);
                return (dueDate.getTime() < nowDate.getTime()) &&
                    (task.status !== "completed" || includeCompleted);
            })
        return overdueTasks;

    } else if (filterKey == t("terms.active").toLowerCase()) {
        const nowDate = new Date();
        const overdueTasks = tasks.filter(
            (task) => {
                const dueDate = new Date(task.dueDate);
                return (dueDate.getTime() > nowDate.getTime()) &&
                    (task.status !== "completed" || includeCompleted);
            })
        return overdueTasks;

    } else if (filterKey == t("terms.highPriority").toLowerCase()) {
        return tasks.filter((task) => task.priority == "high" && (task.status !== "completed" || includeCompleted));

    } else if (filterKey == t("terms.mediumPriority").toLowerCase()) {
        return tasks.filter((task) => task.priority == "medium" && (task.status !== "completed" || includeCompleted));

    } else if (filterKey == t("terms.lowPriority").toLowerCase()) {
        return tasks.filter((task) => task.priority == "low" && (task.status !== "completed" || includeCompleted));

    } else {

        if (filterType == "tag") {
            return tasks.filter((task) => {
                for (let tag of task.tags) {
                    if (tag.title.toLowerCase() == filterKey && (task.status !== "completed" || includeCompleted)) {
                        return true;
                    }
                }
                return false;
            })
        } else if (filterType == "search") {
            return tasks.filter((task) => {
                if (task.title.toLowerCase().includes(filterKey)) {
                    return true;
                }

            })
        }
        return tasks;
    }

}




export function getDueDate(task) {
    const [lang] = useLang();
    const t = useTranslation();

    const dueString = task.dueDate;
    const dueDate = new Date(dueString);
    const now = new Date();
    if (dateFormatters[lang](dueDate) == dateFormatters[lang](now)) {
        return t("terms.today");
    }
    return dateFormatters[lang](dueDate);
}
export function getDueTime(task) {
    const [lang] = useLang();
    const dueString = task.dueDate;
    const dueDate = new Date(dueString);

    return timeFormatters[lang](dueDate);
}

export function sortTasksByDate(tasks) {
    const newTasks = [...tasks];
    quickSort(newTasks, 0, newTasks.length - 1);
    return newTasks;
}
function quickSort(array, start, end) {
    if (end <= start) {
        return;
    }

    const pivot = partition(array, start, end);
    quickSort(array, start, pivot - 1);
    quickSort(array, pivot + 1, end);

}
function partition(array, start, end) {
    let i = start - 1;
    const pivot = array[end].dueDateMs;

    for (let j = start; j < end; j++) {
        if (array[j].dueDateMs < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]]
        }
    }
    i++;
    [array[i], array[end]] = [array[end], array[i]];
    return i;

}

function getDuePhrase(task) {
    const t = useTranslation();
    const nowMs = new Date().getTime();
    const dueMs = new Date(task.dueDate).getTime();
    if (nowMs - dueMs >= 0) {
        return t("titles.overdue");
    } else if (dueMs - nowMs <= 10800000) {
        return t("terms.dueSoon");
    } else {
        return "";
    }
}

const priorityStyles = {
    high: "bg-[var(--color-high-priority)]",
    medium: "bg-[var(--color-medium-priority)]",
    low: "bg-[var(--color-low-priority)]"
}
const alertIcons = {
    light: "bg-[url(/src/assets/icons/light/alert-circle.svg)]",
    dark: "bg-[url(/src/assets/icons/dark/alert-circle.svg)]"
}
function createDefaultTags(task) {
    const [theme] = useTheme();
    const t = useTranslation();
    return [
        {
            title: t("terms." + task.priority.toLowerCase() + "Priority"),
            icon: `${priorityStyles[task.priority]}`
        },
        {
            title: getDuePhrase(task),
            icon: `${alertIcons[theme]}`
        }
    ];
}

export function getTaskTags(task) {
    return [
        ...createDefaultTags(task),
        ...task.tags
    ]
}

function useEditTask(customTarget = "") {
    const [tasks, setTasks] = useTasks();
    function editTask(taskId, newValue, targetKey = customTarget) {

        const newTasks = tasks.map((task) => {
            if (task.id !== taskId) {
                return task;
            }
            let editedTask = task;
            for (let key in task) {
                if (key == targetKey) {
                    editedTask = { ...task, [key]: newValue }
                }
            }
            return editedTask
        });
        setTasks(newTasks);
    }
    return editTask;
}

export function useEditTaskStatus() {
    return useEditTask("status");
}


let currentTagIndex = 0;
export function getAllTags() {
    const [tasks] = useTasks();
    const t = useTranslation();
    let tags = [
        { title: t("terms.active"), icon: "bg-[#5a9afa]" },
        { title: t("terms.highPriority"), icon: priorityStyles["high"] },
        { title: t("terms.today"), icon: "bg-[#8affb3]" },
        { title: t("titles.tomorrow"), icon: "bg-[#ffe88d]" },
        { title: t("titles.overdue"), icon: "bg-[#fca5a5]" },
        { title: t("terms.mediumPriority"), icon: priorityStyles["medium"] },
        { title: t("terms.lowPriority"), icon: priorityStyles["low"] },
        { title: t("terms.completed"), icon: "bg-[#e12afb]" }
    ]
    for (let task of tasks) {
        tags = [...tags, ...task.tags];
    }
    tags = removeDublicateTags(tags);
    currentTagIndex = 0;
    return tags;
}

function removeDublicateTags(tags) {
    if (currentTagIndex >= tags.length) {
        return tags;
    }
    const indecies = findDublicates(tags[currentTagIndex], tags);
    if (indecies.length !== 0) {
        for (let index of indecies) {
            tags.splice(index, 1);
        }
    }
    currentTagIndex++;
    return removeDublicateTags(tags);
}

function findDublicates(targetTag, tags) {
    const indecies =
        tags
            .map((tag, i) =>
                tag.title == targetTag.title ? i : -1
            ).filter(index =>
                index !== -1
            );
    indecies.shift();
    return indecies;
}