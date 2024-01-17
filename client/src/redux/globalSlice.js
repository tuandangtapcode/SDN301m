import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setIsPlay: (state, action) => {
      state.isPlay = action.payload;
    },
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  }
})


export default globalSlice;

