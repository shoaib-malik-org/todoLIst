import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";


// Global variables
var id = 0;

// slice method

const slice = createSlice({
    name: 'task reducer',
    initialState: { real:[], sort:[] },
    reducers: {
        task_add: (state, action) => {
            state.real.push({
                id: id++,
                task: action.payload,
            })
        }
        ,
        task_completed: (state, action) => {
            const index = state.real.findIndex(get => get.id === action.payload)
            state.real.splice(index, 1);
        }
        ,
        task_update: (state, action) => {
            const index = state.real.findIndex(get => get.id === action.payload.id)
            state.real.splice(index,1,action.payload)
        }
        ,
        task_replace: (state, action) => {
            state.real.splice(0, state.real.length)
            action.payload.forEach(element => state.real.push({ ...element }));
        }
        ,
        task_sorted: (state, action) => {
            state.sort.splice(0, state.sort.length)
            action.payload.forEach(element => state.sort.push({ ...element }));
        }

    }
})

const tasks = tasks => tasks
const finder = (num, tasks) => tasks.find(task => task.task.length === num)
const first = tasks => tasks.task.length
const rev = lengths => lengths.reverse();

const len = (tasks, Func) => {
    var lengths = tasks.map(first)
    lengths.sort(function (a, b) { return b - a });
    Func(lengths);
    const sorted = lengths.map(num => finder(num, tasks))
    return sorted;
}

export const taskSort = createSelector(tasks, tasks => len(tasks, () => { }))

export const lowHigh = createSelector(tasks, tasks => len(tasks, rev))

export const srhTask = (tasks, word) => tasks.filter(task => task.task.indexOf(word) != -1)

export const { task_add, task_completed, task_update, task_replace, task_sorted } = slice.actions;
export default slice.reducer










// tasks.find(task => task.task.length === num)


// Creating Actions

/*
* in this method you have to create action and reducer differently but the upper slice method
* keep in one
*/

// export const task_add = createAction("task_added");
// export const task_completed = createAction("task_completed");

// // creating reducer
// export const reducer = createReducer(
//     [],
//     {
//         [task_add.type]: (state, action) => {
//             state.push({
//                 id: id++,
//                 task: action.payload,
//             })
//         }
//         ,
//         [task_completed.type]: (state, action) => {
//             console.log(action)
//             const index = state.findIndex( task =>
//                 true
//             )
//             state.splice(0,1);
//         }
//     }
// )