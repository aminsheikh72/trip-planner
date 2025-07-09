import { configureStore } from "@reduxjs/toolkit";
import agent from '../features/agentSlice'

const store = configureStore({
    reducer : {
        agent
    }

})

export default store