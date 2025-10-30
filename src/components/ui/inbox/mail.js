import { useInbox } from "@/context/User";
import { quickSort } from "../tasks/tasks.js";
import { useTranslation } from "@/context/Language";

export function filterMail(mail, from, search) {
    const newMail = mail.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()) || m.content.toLowerCase().includes(search.toLowerCase()));
    if (from == "all") return newMail;
    return newMail.filter((m) => m.from == from);

}

export function sortInbox(inbox) {
    const newInbox = [...inbox];
    quickSort(newInbox, 0, newInbox.length - 1, partitionMail);
    return newInbox;
}

function partitionMail(array, start, end) {
    let i = start - 1;
    const pivot = new Date(array[end].receivedAt).getTime();

    for (let j = start; j < end; j++) {
        if (new Date(array[j].receivedAt).getTime() < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]]
        }
    }
    i++;
    [array[i], array[end]] = [array[end], array[i]];
    return i;

}


export function useUpdateMail() {
    const [inbox, setInbox] = useInbox();
    function updateMail(mail) {
        let indexOfMail = -1;
        inbox.map((m, i) => {
            if (m.id == mail.id) indexOfMail = i;
        });
        if (indexOfMail !== -1) {
            const firstSlice = inbox.slice(0, indexOfMail);
            let secondSlice = inbox.slice(indexOfMail);
            secondSlice.shift();
            secondSlice.unshift(mail);
            setInbox([...firstSlice, ...secondSlice]);
            return;
        } else {
            setInbox(sortInbox([...inbox, mail]));
            return;
        }
    } return updateMail;
}

export function processMail(inbox) {
    return inbox.map((mail) => interpreteMail(mail));
}
function interpreteMail(mail) {
    const t = useTranslation();

    if (mail.from == "system") {
        return interpreteSystemMail(mail, t);
    } else if (mail.from == "tasks") {
        return interpreteTasksMail(mail, t);
    }
}

function interpreteSystemMail(mail, t) {
    const { title, content } = t(`mail.${mail.key}`, { returnObjects: true });
    const newMail = { ...mail, title, content };
    return newMail;
}
function interpreteTasksMail(mail, t) {
    if (mail.type == "due") {
        const content = t(`mail.isDueIn`, { count: mail.dueHours, task: mail.title });
        const newMail = { ...mail, content };
        return newMail;
    }
}