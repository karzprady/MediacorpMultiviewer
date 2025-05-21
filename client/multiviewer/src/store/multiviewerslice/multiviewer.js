import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    
    videoList: [],
}

export const Addvideo  = createAsyncThunk("/addvideo" , async (newVideo)=>{

    const res = await axios.post(`${import.meta.env.VITE_API}/api/multiviewer/addVideo`, newVideo);
    return res.data;
})

export const GetAllVideos = createAsyncThunk("/getvideos" , async ()=>{
    const res = await axios.get(`${import.meta.env.VITE_API}/api/multiviewer/getVideos`);
    return res.data;
})

export const RemoveVideo = createAsyncThunk("/removevideo" , async ({id,type})=>{
    const res = await axios.delete(`${import.meta.env.VITE_API}/api/multiviewer/removeVideo/${id}/${type}`);
    return res.data; 
}   )

const MultiviewerSlice = createSlice({
    name: "multiviewer",
    initialState,
    reducers : {},
    extraReducers : (builder)=>{

        builder.addCase(GetAllVideos.fulfilled , (state, action)=>{
            state.videoList = action.payload;
        }).addCase(GetAllVideos.rejected , (state, action)=>{
            state.videoList = [];
        }).addCase(GetAllVideos.pending , (state, action)=>{
            state.videoList = [];
        })

    }
})


export default MultiviewerSlice.reducer;