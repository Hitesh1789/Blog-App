import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts : []
}

const postSlice = createSlice({
    name : "post",
    initialState,
    reducers : {
        addPosts : (state,action)=>{
            state.posts = [...action.payload.posts];
        },
        addPost : (state,action)=>{
           state.posts.push(action.payload);
        },
        deletePost : (state,action)=>{
            state.posts = state.posts.filter((post)=>(post.$id!==action.payload.$id))
        },
        updatePost : (state,action)=>{
            state.posts = state.posts.map((post)=>(
                (action.payload.$id==post.$id) ? action.payload.updatedPost: post
            ))
        },
        clearPosts : (state)=>{
            state.posts = [];
        }
    }
})

export const {addPosts,addPost,updatePost,deletePost,clearPosts} = postSlice.actions;

export default postSlice.reducer;