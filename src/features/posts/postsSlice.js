import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const BASE_URL = 'api url'

// action/message fetchPostsByUser
export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchByUser",
  async (userId) => {
    const response = await fetch(`${BASE_URL}/posts/user/${userId}`)
    return response.json() // this is the action in the addCase
    // return [{id: 1, content: "when is lunch"}]
  }
)

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
      // action.payload = [{id: 1, content: "when is lunch"}] 
      // we got it from the fetchPostsByUser output or return 

      state.posts = action.payload
      // state.posts = []
      // state.posts is the current posts that you are showing

      // since action payload is returned, we will update our state
      // state.posts = [{id: 1, content: "when is lunch"}] 

      // before: state.loading = true 
      // we want the loading animation to stop
      state.loading = false // to stop the loading animation
    })
  }
})

export default postsSlice.reducer