import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chiefs: [
        {
            name: "Charith N Silva",
            img: "/img/top-chiefs/img_8.jpg",
            recipesCount: "20",
            cuisine: "Sri Lankan",
        },
        {
            name: "Dharshan Munidasa",
            img: "/img/top-chiefs/img_7.jpg",
            recipesCount: "18",
            cuisine: "Sri Lankan",
        },
        {
            name: "Ambagaspitiya",
            img: "/img/top-chiefs/img_9.jpg",
            recipesCount: "16",
            cuisine: "Sri Lankan",
        },
        {
            name: "Juan Carlos",
            img: "/img/top-chiefs/img_1.jpg",
            recipesCount: "10",
            cuisine: "Mexican",
        },
        {
            name: "John Doe",
            img: "/img/top-chiefs/img_2.jpg",
            recipesCount: "05",
            cuisine: "Japanese",
        },
        {
            name: "Erich Maria",
            img: "/img/top-chiefs/img_3.jpg",
            recipesCount: "13",
            cuisine: "Italian",
        },
        {
            name: "Chris Brown",
            img: "/img/top-chiefs/img_4.jpg",
            recipesCount: "08",
            cuisine: "American",
        },
        {
            name: "Blake Lively",
            img: "/img/top-chiefs/img_5.jpg",
            recipesCount: "09",
            cuisine: "French",
        },
        {
            name: "Ben Affleck",
            img: "/img/top-chiefs/img_6.jpg",
            recipesCount: "04",
            cuisine: "Indian",
        },
    ],
};

const chiefSlice = createSlice({
    name: "chiefs",
    initialState,
    reducers: {
        // You can add reducers like addChief, removeChief, etc.
    },
});

export const selectChiefs = (state) => state.chiefs.chiefs;

export default chiefSlice.reducer;
