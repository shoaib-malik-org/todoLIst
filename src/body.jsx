import { useState } from "react"
import { Navbar } from "./navbar"
import { task_add } from "./redux/taskReducer";
import { store } from "./redux/store";
import { Task } from "./task";
import { defaultColors } from "./redux/colorReducer";

export function Body() {
    return (
        <>
            <Navbar />
            <Add />
        </>
    )
}
var taskAdd;
var casheState;
var casheSort;

store.subscribe(() => {
    var curState = store.getState().task.real
    if (curState !== casheState) {
        casheState = curState
        taskAdd(casheState)
    }

    var curSort = store.getState().task.sort;
    if(curSort !== casheSort) {
        casheSort = curSort
        taskAdd(casheSort)
    }
    
})

function Add() {
    var [tasks, tasksFunc] = useState([])
    var [task, inputFunc] = useState('');
    
    taskAdd = (tasks) => {
        inputFunc('')
        tasksFunc(tasks)
    }

    function submit(e) {
        e.preventDefault();
        store.dispatch(defaultColors('black'))
        store.dispatch(task_add(task))
    }
    function getInput(e) {
        inputFunc(e.target.value)
    }
    return (
        <div className="container mt-5 sans">
            <div className="row">
                <div className="col-md-4 center">
                    <form onSubmit={submit}>
                        <div className="row">
                            <div className="col-md-8">
                                <label htmlFor="sfs">Enter task here</label>
                                <input value={task} onChange={getInput} type="text" className="form-control" name="task" placeholder="Wright here" required />
                            </div>
                            <div className="col">
                                <input type="submit" className="btn btn-blue mt-4" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Task put={tasks} />
        </div>
    )
}