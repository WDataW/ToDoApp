// not finished at this point
export function filterTasks(tasks, filterKey){
    const nowMs = Date.now();
    switch(filterKey){
        case "today":{
            const todayTasks = tasks.filter((task)=>{
                const dueDate = new Date(task.dueDate).getTime();
                
            });
            return todayTasks;
        }
        case "tomorrow":{};
        case "overdue":{};
        case "important":{};
        default:{
        }    
    }
}