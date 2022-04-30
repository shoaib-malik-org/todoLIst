import { useState } from "react";
import { task_completed, task_update } from "./redux/taskReducer";
import { colors } from "./redux/colorReducer";
import { store } from "./redux/store";

var clr;

store.subscribe(() => {
    clr(store.getState())
})



export function Task(allTask) {
    allTask = allTask.put;
    return (
        <div className="row row-cols-1 mt-5 row-cols-md-2 row-cols-lg-3">
            {Cols(allTask)}
        </div>
    )
}

function Cols(props) {
    var [id, idFunc] = useState();
    var [code, codeChng] = useState(false)
    var [utask, utaskFunc] = useState('')
    var [color, colorFunc] = useState([])
    function dlt(e) {
        store.dispatch(task_completed(Number(e.target.id)))
    }
    function upd(e) {
        idFunc(e.target.id)
        codeChng(true)
    }
    function submit(e) {
        e.preventDefault();
        store.dispatch(task_update({ id: Number(id), task: utask }))
        utaskFunc('');
        idFunc(undefined)
        codeChng(false)
    }
    clr = (state) => {
        colorFunc(state.color)
    }
    function clrChng(e) {
        store.dispatch(colors({ id: e.target.id, color: e.target.ariaLabel }))
    }
    function task(task) {
        var date = new Date();

        return (
            <div className="col mb-3" key={task.id}>
                <div className="row px-3 py-4 h-100 me-md-1 rounded-3" style={{ border: color[task.id].color + ' 1px solid' }}>
                    <div className="col-10 ">
                        <h3 style={{ color: color[task.id].color }}>{task.task}</h3>
                        {date.toLocaleDateString()}
                    </div>
                    <div className="col-2">
                        <div className="dropdown">
                            <button className="btn btn-secondary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                ...
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li>
                                    <p id={task.id} onClick={upd} className="dropdown-item my-0">Update</p>
                                </li>
                                <li>
                                    <p id={task.id} onClick={dlt} className="dropdown-item mb-0 text-danger">Delete</p>
                                </li>
                            </ul>
                            <button className="btn btn-danger mt-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                ...
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li>
                                    <p id={task.id} aria-label="green" onClick={clrChng} className="dropdown-item my-0">Green</p>
                                </li>
                                <li>
                                    <p id={task.id} aria-label='red' onClick={clrChng} className="dropdown-item mb-0">Red</p>
                                </li>
                                <li>
                                    <p id={task.id} aria-label='black' onClick={clrChng} className="dropdown-item mb-0">Black</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {(code) &&
                <div className="container position-absolute" style={{ top: '140px' }}>
                    <div className="row">
                        <div className="col-6">
                            <form onSubmit={submit}>
                                <input value={utask} type="text" className="form-control" onChange={(e) => { utaskFunc(e.target.value) }} />
                                <button className="btn-blue">done</button>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {props.map(task)}
        </>
    )
}