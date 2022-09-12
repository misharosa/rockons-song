import { configureStore } from "@reduxjs/toolkit";

const defaultState = {
    songs: [],
    value: ''
}

export const someReducer = (state = defaultState , action) => {
    switch (action.type) {
        case "ON_ADD":
            return {...state, songs: [action.payload, ...state.songs], value: ''}
        case "ON_CHANGE":
            return {...state, value: action.payload}
        case "GET_TODO":
            return {...state, songs: action.payload}
        default:
            return state
    }
}

export const store = configureStore({ reducer: someReducer })