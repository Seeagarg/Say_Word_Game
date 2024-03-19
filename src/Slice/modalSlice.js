import { createSlice } from "@reduxjs/toolkit";

const initialState = {showModal:false,showCategoryModal:false}

const modalSlice = createSlice({
    name:"modalSlice",
    initialState:initialState,
    reducers:{
        openShowModal:(state,action)=>{
            state.showModal = true;
            return state;
        },
        closeShowModal:(state,action)=>{
            state.showModal = false;
            return state;
        },
        openCategoryModal:(state,action)=>{
            state.showCategoryModal = true;
            return state;
        },
        closeCategoryModal:(state,action)=>{
            state.showCategoryModal = false;
            return state;
        }

    }
})

export const {openShowModal,closeShowModal,openCategoryModal,closeCategoryModal} = modalSlice.actions;
export default modalSlice.reducer