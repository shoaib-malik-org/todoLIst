import { createSlice } from "@reduxjs/toolkit";

// Global variables
var id = 0;

// slice method

const slice = createSlice({
    name: 'color reducer',
    initialState: [],
    reducers: {
        colors: (state, action) => {
            state.splice(action.payload.id,1,{color:action.payload.color})
        },
        defaultColors: (state, action) => {
            state.push({
                color: action.payload
            })
        }
    }
})

export const { colors, defaultColors } = slice.actions;
export default slice.reducer