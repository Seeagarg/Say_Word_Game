import { createSlice } from "@reduxjs/toolkit";

const initialState = {showModal:false,showCategoryModal:false,instructionModal:true}

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
        },
        openInstructionModal:(state,action)=>{
            state.instructionModal = true;
            return state;
        },
        closeInstructionModal:(state,action)=>{
            state.instructionModal = false;
            return state;
        }

    }
})

export const {openShowModal,closeShowModal,openCategoryModal,closeCategoryModal,openInstructionModal,closeInstructionModal} = modalSlice.actions;
export default modalSlice.reducer