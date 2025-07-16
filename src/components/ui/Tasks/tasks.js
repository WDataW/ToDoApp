import { dateFormatters, timeFormatters } from "../../../scripts/dateTime";
// not finished at this point
export function filterTasks(tasks, filterKey) {
    const [lang] = useLang();
    switch (filterKey) {
        case "today": {
            const nowDate = dateFormatters[lang](new Date());
            const todayTasks = tasks.filter(
                (task) => {
                    const dueDate = dateFormatters[lang](new Date(task.dueDate));
                    return dueDate == nowDate;
                }
            );
            return todayTasks;
        };
        case "tomorrow": {
            const tmrwDate = new Date();
            tmrwDate.setDate(tmrwDate.getDate() + 1);
            const tomorrowTasks = tasks.filter(
                (task) => {
                    const dueDate = new Date(task.dueDate);
                    return (dueDate.getFullYear() == tmrwDate.getFullYear() && dueDate.getMonth() == tmrwDate.getMonth() && dueDate.getDate() == tmrwDate.getDate());
                })
            return tomorrowTasks;
        };
        case "overdue": {
            const nowDate = new Date();
            const overdueTasks = tasks.filter(
                (task) => {
                    const dueDate = new Date(task.dueDate);
                    return (dueDate.getTime() < nowDate.getTime());
                })
            return overdueTasks;
        };
        case "hight-priority": { };
        default: {
            return tasks;
        }
    }
}

import { useLang, useTranslation } from "../../../context/Language";
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
    const dueMs = task.dueDateMs;
    if (nowMs - dueMs >= 0) {
        return t("titles.overdue");
    } else if (dueMs - nowMs <= 10800000) {
        return t("terms.dueSoon");
    } else {
        return "";
    }
}

import { useTheme } from "../../../context/Theme";
const priorityStyles = {
    high: "bg-red-600",
    medium: "bg-yellow-600",
    low: "bg-gray-400"
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

import { useTasks } from "../../../context/User";
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