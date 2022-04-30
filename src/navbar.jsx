import { lowHigh, taskSort, task_replace } from "./redux/taskReducer"
import { store } from './redux/store'
import { task_sorted, srhTask } from "./redux/taskReducer";
import { useState } from "react";


var casheState;
var srcNull;
store.subscribe(()=>{
    var curState = store.getState().task.real
    if (curState !== casheState) {
        casheState = curState
        srcNull();
    }
})

export function Navbar() {
    var [src,srcFunc]=useState('')
    function sort(Func) {
        store.dispatch(task_replace(Func(store.getState().task.real)))
    }
    function search(e){
        srcFunc(e.target.value)
        store.dispatch(task_sorted(srhTask(store.getState().task.real,e.target.value)))
    }
    srcNull = function(){
        srcFunc('')
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
            <div className="container-fluid">
                <p className="sans h4 ms-5">Task Manager</p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
                        <li className="nav-link">
                            <input value={src} onChange={search} className="form-control me-2 ms-5 w-75" type="search" placeholder="Search" aria-label="Search" />
                        </li>
                        <li className="nav-link">
                            <button className="btn text-blue border py-1"
                                onClick={() => sort(taskSort)}>High to low</button>
                        </li>
                        <li className="nav-link">
                            <button className="btn text-blue border py-1"
                                onClick={() => sort(lowHigh)}>Low to high</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}