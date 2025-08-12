import { useInfo, useTags, useTasks } from "../../../context/User";
import { useTheme } from "../../../context/Theme";
import { numToArabic, useLang, useTranslation } from "../../../context/Language";
import { dateFormatters, timeFormatters } from "../../../scripts/dateTime";
export function loopFilterTasks(tasks, filterKeys, filterType) {
    if (filterKeys.length == 0) {
        return tasks;
    }
    const t = useTranslation();
    let newTasks = tasks;
    const includeCompleted = filterKeys.includes(t("terms.completed")) || filterKeys.includes(t("terms.all"));
    for (let filter of filterKeys) {
        newTasks = filterTasks(newTasks, filter, filterType, includeCompleted);
    }
    return newTasks
}
export function filterTasks(tasks, filterKey, filterType, includeCompleted) {
    const t = useTranslation();
    filterKey = filterKey.toLowerCase();
    const [lang] = useLang();

    if (filterKey == t("terms.all").toLowerCase()) {
        return tasks;
    }
    else if (filterKey == t("terms.completed").toLowerCase()) {
        return tasks.filter((task) => task.status == "completed");
    } else if (filterKey == t("terms.today").toLowerCase()) {
        const nowDate = dateFormatters[lang](new Date());
        const todayTasks = tasks.filter(
            (task) => {
                const dueDate = dateFormatters[lang](new Date(task.dueDate));
                return (dueDate == nowDate) && (task.status !== "completed" || includeCompleted);
            }
        );
        return todayTasks;

    } else if (filterKey == t("terms.tomorrow").toLowerCase()) {
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

    } else if (filterKey == t("terms.overdue").toLowerCase()) {
        const nowDate = new Date();
        const overdueTasks = tasks.filter(
            (task) => {
                const dueDate = new Date(task.dueDate);
                return (dueDate.getTime() <= nowDate.getTime()) &&
                    (task.status !== "completed");
            })
        return overdueTasks;

    } else if (filterKey == t("terms.active").toLowerCase()) {
        const nowDate = new Date();
        const activeTasks = tasks.filter(
            (task) => {
                const dueDate = new Date(task.dueDate);

                return (dueDate.getTime() > nowDate.getTime()) && (task.status !== "completed");
            })
        return activeTasks;

    } else if (filterKey == t("terms.highPriority").toLowerCase()) {
        return tasks.filter((task) => task.priority == "high" && (task.status !== "completed" || includeCompleted));

    } else if (filterKey == t("terms.mediumPriority").toLowerCase()) {
        return tasks.filter((task) => task.priority == "medium" && (task.status !== "completed" || includeCompleted));

    } else if (filterKey == t("terms.lowPriority").toLowerCase()) {
        return tasks.filter((task) => task.priority == "low" && (task.status !== "completed" || includeCompleted));

    } else {
        if (filterType == "tag") {
            const [tags] = useTags();
            const tagId = filterKey;
            const taskResults = tasks.filter((task) => task.tags.includes(tagId) && (task.status !== "completed" || includeCompleted));
            return taskResults;
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
    quickSort(newTasks, 0, newTasks.length - 1, partitionDate);
    return newTasks;
}
function quickSort(array, start, end, partition) {
    if (end <= start) {
        return;
    }

    const pivot = partition(array, start, end);
    quickSort(array, start, pivot - 1, partition);
    quickSort(array, pivot + 1, end, partition);

}
function partitionDate(array, start, end) {
    let i = start - 1;
    const pivot = new Date(array[end].dueDate).getTime();

    for (let j = start; j < end; j++) {
        if (new Date(array[j].dueDate).getTime() < pivot) {
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
    if (task.status == "completed") {
        return t("terms.completed");
    }
    else if (nowMs - dueMs >= 0 && task.status !== "completed") {
        return t("terms.overdue");
    } else if (dueMs - nowMs <= 10800000 && dueMs - nowMs >= 0) {
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

    const [tagsBase] = useTags();
    const taskTags = [];
    for (let tagId of task.tags) {
        taskTags.push(...tagsBase.filter((tag) => tag.id == tagId));
    }


    return taskTags;
}
export function getFinalTaskTags(task) {
    return [
        ...createDefaultTags(task),
        ...getTaskTags(task)
    ]
}

export function useEditTask() {
    const [tasks, setTasks] = useTasks();
    function editTask(newTask) {
        let newTasks = tasks.filter((task) => task.id !== newTask.id);
        newTasks = [...newTasks, newTask];
        setTasks(sortTasksByDate(newTasks));
    }
    return editTask;
}
export function useEditTag() {
    const [tags, setTags] = useTags();
    function editTag(newTag) {
        let newTags;
        if (tags.filter((tag) => tag.id == newTag.id).length !== 0) {
            let tagIndex;
            tags.map((tag, i) => {
                if (tag.id == newTag.id) {
                    tagIndex = i;
                }
            });
            newTags = [...tags];
            newTags[tagIndex] = newTag;
        } else {
            newTags = [newTag, ...tags];
        }
        setTags(newTags);
    }
    return editTag;
}

// export function useEditTaskStatus() {
//     return useEditTask("status");
// }


// let currentTagIndex = 0;
export function useAllTags(includeBuiltInTags = true) {

    const t = useTranslation();

    const [baseTags] = useTags();
    let tags = [...baseTags];
    if (!includeBuiltInTags) {
        tags = tags.filter((tag) => !tag?.builtIn);
    }
    return [...tags]
}

// function removeDublicateTags(tags) {
//     if (currentTagIndex >= tags.length) {
//         return tags;
//     }
//     const indecies = findDublicates(tags[currentTagIndex], tags);
//     if (indecies.length !== 0) {
//         for (let index of indecies) {
//             tags.splice(index, 1);
//         }
//     }
//     currentTagIndex++;
//     return removeDublicateTags(tags);
// }

// function findDublicates(targetTag, tags) {
//     const indecies =
//         tags
//             .map((tag, i) =>
//                 tag.title == targetTag.title ? i : -1
//             ).filter(index =>
//                 index !== -1
//             );
//     indecies.shift();
//     return indecies;
// }



export function interpreteBuiltInTagTitle(builtInTag) {
    const t = useTranslation();
    let title = builtInTag.title.replace(" ", "");

    const firstLetter = title.slice(0, 1).toLowerCase();
    const notFirstLetter = title.slice(1);
    const translationKey = firstLetter + notFirstLetter;
    return t(`terms.${translationKey}`);

}


export function headingsInterpreter(tagTitle) {
    const UUIDTitle = tagTitle.replace("tag:", "");
    if (isUUID(UUIDTitle)) {
        const [tags] = useTags();
        const [targetTag] = tags.filter((tag) => tag.id == tagTitle);

        return targetTag.title;
    }
    return tagTitle
}

function isUUID(id) {
    const UUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    return UUIDRegex.test(id);
}






/* double linechart */
import { ISOToDate } from "../../../scripts/dateTime";
import { getDaysInMonth } from "date-fns";

export function useCreatedTasksInMonth(year, month) {
    const [tasks] = useTasks();
    const searchDate = new Date(year, month, 0);
    const result = tasks.filter((task) => {
        const createdAt = ISOToDate(task.createdAt);
        return (
            createdAt.getFullYear() == searchDate.getFullYear()
            && createdAt.getMonth() == searchDate.getMonth()
        )
    })
    return result;
}


export function useCompletedTasksInMonth(year, month) {
    const [tasks] = useTasks();
    const searchDate = new Date(year, month, 0);
    const result = tasks.filter((task) => {
        if (task.status !== "completed") return false;
        const completedAt = ISOToDate(task.completedAt);
        return (
            completedAt.getFullYear() == searchDate.getFullYear()
            && completedAt.getMonth() == searchDate.getMonth()
        )
    })
    return result;
}


export function useYearlyTasksData(year) {
    let months = [];
    const [lang] = useLang();
    for (let i = 1; i <= 12; i++) {
        const createdTasks = useCreatedTasksInMonth(year, i);
        const completedTasks = useCompletedTasksInMonth(year, i);
        const month = new Date(year, i - 1).toLocaleString(lang == "ar" ? "ar-SA" : "en-US", { calendar: "gregory", month: lang == "ar" ? "long" : "short" });
        months = [...months, { month: month, created: createdTasks.length, completed: completedTasks.length }]
    }
    return months;
}


export function useCreatedTasksInDay(year, month, day) {
    const [tasks] = useTasks();
    const searchDate = new Date(Date.UTC(year, month - 1, day));

    const result = tasks.filter((task) => {
        const taskCreatedAt = ISOToDate(task.createdAt);

        return (
            taskCreatedAt.getFullYear() == searchDate.getFullYear()
            && taskCreatedAt.getMonth() == searchDate.getMonth()
            && taskCreatedAt.getDate() == searchDate.getDate()
        );
    }
    );
    return result;
}

export function useCompletedTasksInDay(year, month, day) {
    const [tasks] = useTasks();
    const searchDate = new Date(Date.UTC(year, month - 1, day));

    const result = tasks.filter((task) => {
        if (task.status !== "completed") return false;
        const taskCompletedAt = ISOToDate(task.completedAt);

        return (
            taskCompletedAt.getFullYear() == searchDate.getFullYear()
            && taskCompletedAt.getMonth() == searchDate.getMonth()
            && taskCompletedAt.getDate() == searchDate.getDate()
        );
    }
    );
    return result;
}


export function useMonthlyTasksData(year, month) {
    let days = [];
    const [lang] = useLang();
    for (let i = 1; i <= getDaysInMonth(new Date(year, month - 1)); i++) {
        const createdTasks = useCreatedTasksInDay(year, month, i);
        const completedTasks = useCompletedTasksInDay(year, month, i);
        days = [...days, { day: lang == "ar" ? numToArabic(String(i)) : String(i), created: createdTasks.length, completed: completedTasks.length }]
    }
    return days;
}



/* Radar chart */
export function useActivity() {
    const [tasks] = useTasks();
    const [lang] = useLang();
    let activity = [];
    for (let i = 0; i < 7; i++) {
        const tasksAccomplishedInDay = tasks.filter((task) => {
            if (task.status !== "completed") return false;

            const completedAt = new Date(task.completedAt);
            return completedAt.getDay() == i;
        });
        const date = new Date(2025, 5, i + 1);
        const day = date.toLocaleString(lang == "ar" ? "ar-SA" : "en-US", { calendar: "gregory", weekday: lang == "ar" ? "long" : "short" });
        activity = [...activity, { label: "completed tasks", day: day, completed: tasksAccomplishedInDay.length }]
    }
    return activity;
}


/* Bar Chart */
export function useTagBars(filters) {
    const [tasks] = useTasks();
    const t = useTranslation();
    const filteredTasks = loopFilterTasks(tasks, filters);
    const tags = getTasksTags(filteredTasks);
    const bars = convertTagsToBars(tags);
    const reducedBars = reduceBars(bars)
    return reducedBars;
}

function getTasksTags(tasks) {

    let tags = [];
    for (let task of tasks) {
        if (task.tags.length == 0) continue;
        for (let tag of task.tags) {
            tags.push(tag);
        }
    }
    return tags;
}

function convertTagsToBars(tags) {
    if (tags.length == 0) {
        return [];
    }
    const key = tags[0];

    const allTags = useAllTags();
    const [targetTag] = allTags.filter((tag) => tag.id == key);
    const title = targetTag.title;
    const color = targetTag.color
    let frequency = 0;
    for (let tag of tags) {
        if (tag == key) {
            frequency++;
        }
    }
    tags = tags.filter((tag) => tag !== key);
    const bars = [{ tag: title, frequency: frequency, fill: color }, ...convertTagsToBars(tags)];
    return bars
}

function reduceBars(bars) {
    const t = useTranslation();
    const [lang] = useLang();

    const sortedBars = sortBarsByFrequency(bars);

    let otherCount = 0;
    sortedBars.slice(4).map((bar) => { otherCount += bar.frequency });// to increment otherCount

    let otherTagCount = sortedBars.length - 4;
    const otherObj = otherTagCount > 0 ? { tag: `${lang == "ar" ? numToArabic(otherTagCount) : otherTagCount} ${t("terms.others")}`, frequency: otherCount, fill: "rgba(128, 128, 128, 0.49)" } : null;

    let reducedBars;
    if (otherObj) {
        reducedBars = [...sortedBars.slice(0, 4), otherObj];
    } else {
        reducedBars = sortedBars.slice(0, 4);
    }
    return reducedBars;
}

function sortBarsByFrequency(bars) {
    const newBars = [...bars];
    quickSort(newBars, 0, newBars.length - 1, partitionFrequency);
    return newBars;
}

function partitionFrequency(array, start, end) {
    let i = start - 1;
    const pivot = array[0].frequency;

    for (let j = start; j < end; j++) {
        if (array[j].frequency > pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]]
        }
    }
    i++;
    [array[i], array[end]] = [array[end], array[i]];
    return i;
}

/* generate achievements */
export const trophyThemes = {
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "diamond",
    5: "glitch",
}
export function useGeneratedTrophies() {
    const [tasks] = useTasks();
    const productive = generateProductive(tasks);
    const onTime = generateOnTime(tasks);
    const powerUser = generatePowerUser();
    return [...productive, ...onTime, ...powerUser];
}
function generateProductive(tasks) {
    const t = useTranslation()
    const completedTasksLength = filterTasks(tasks, "completed").length;
    if (completedTasksLength == 0) {
        return [];
    }
    const titleKey = "productive"
    let level;
    let description;
    let nextGoal;
    if (completedTasksLength >= 1000) {
        description = t("terms.completeTasks", { count: 1000 });
        nextGoal = -1;
        level = 5;
    } else if (completedTasksLength >= 500) {
        description = t("terms.completeTasks", { count: 500 });
        nextGoal = 1000;
        level = 4;
    } else if (completedTasksLength >= 200) {
        description = t("terms.completeTasks", { count: 200 });
        nextGoal = 500;
        level = 3;
    } else if (completedTasksLength >= 100) {
        description = t("terms.completeTasks", { count: 100 });
        nextGoal = 200;
        level = 2;
    } else if (completedTasksLength >= 1) {
        description = t("terms.completeTasks", { count: 1 });

        nextGoal = 100;
        level = 1;
    } else {
        return [];
    }
    return [{
        titleKey,
        currentCount: completedTasksLength,
        level,
        description,
        nextGoal,
        nextGoalDescription: t("terms.completeTasks", { count: nextGoal }),

        theme: trophyThemes[level]
    }]
}
function generateOnTime(tasks) {
    const t = useTranslation();
    const completedTasks = filterTasks(tasks, "completed");
    if (completedTasks.length == 0) {
        return [];
    }
    const onTimeTasksLength = completedTasks.filter((task) => {
        const dueDate = new Date(task.dueDate).getTime();
        const completedAt = new Date(task.completedAt).getTime();
        return completedAt < dueDate;
    }).length;
    const titleKey = "onTime"
    let level;
    let description;
    let nextGoal;
    if (onTimeTasksLength >= 500) {
        level = 5;
        description = t("terms.completeTasksOnTime", { count: 500 });
        nextGoal = -1;
    } else if (onTimeTasksLength >= 250) {
        level = 4;
        description = t("terms.completeTasksOnTime", { count: 250 });
        nextGoal = 500;
    } else if (onTimeTasksLength >= 150) {
        level = 3;
        description = t("terms.completeTasksOnTime", { count: 150 });
        nextGoal = 250;
    } else if (onTimeTasksLength >= 50) {
        level = 2;
        description = t("terms.completeTasksOnTime", { count: 50 });
        nextGoal = 150;
    } else if (onTimeTasksLength >= 1) {
        level = 1;
        description = t("terms.completeTasksOnTime", { count: 1 });
        nextGoal = 50;
    } else {
        return [];
    }
    return [{
        titleKey,
        currentCount: onTimeTasksLength,
        level,
        description,
        nextGoal,
        nextGoalDescription: t("terms.completeTasksOnTime", { count: nextGoal }),
        theme: trophyThemes[level]
    }]
}

function generatePowerUser() {
    const t = useTranslation();
    const [info] = useInfo();
    const highestLogInStreak = info.highestLogInStreak;
    const titleKey = "powerUser"
    let level;
    let description;
    let nextGoal;
    if (highestLogInStreak >= 120) {
        level = 5;
        description = t("terms.logInStreak", { count: 120 });
        nextGoal = -1;
    } else if (highestLogInStreak >= 60) {
        level = 4;
        description = description = t("terms.logInStreak", { count: 60 });
        nextGoal = 120;
    } else if (highestLogInStreak >= 35) {
        level = 3;
        description = description = t("terms.logInStreak", { count: 35 });
        nextGoal = 60;
    } else if (highestLogInStreak >= 15) {
        level = 2;
        description = description = t("terms.logInStreak", { count: 15 });
        nextGoal = 35;
    } else if (highestLogInStreak >= 3) {
        level = 1;
        description = description = t("terms.logInStreak", { count: 3 });
        nextGoal = 15;
    } else {
        return [];
    }
    return [{
        titleKey,
        currentCount: highestLogInStreak,
        level,
        description,
        nextGoal,
        nextGoalDescription: t("terms.logInStreak", { count: nextGoal }),
        theme: trophyThemes[level]
    }]
}
