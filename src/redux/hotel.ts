// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';
import envConfig from '../configs/environments';
import {Page} from '@/configs/models/page';

// ** Actions
export const getHotel = createAsyncThunk(
  'appHotel/getHotel',
  async (params: any) => {
    const {hotel, lang} = params;

    try {
      const response: any = await axios.get(
        `${envConfig.api}hotel/${hotel}/${lang.toUpperCase()}`,
      );
      return {
        params,
        data: response?.data?.payload as Page,
      };
    } catch (e) {
      console.log(e);
      return {e};
    }
  },
);

// ** Create slice and return data
export const appHotelSlice = createSlice({
  name: 'appHotel',
  initialState: {
    data: {},
    success: false,
    error: false,
    loading: false,
  } as any,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getHotel.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(getHotel.pending, state => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(getHotel.rejected, state => {
      state.loading = false;
      state.success = false;
      state.error = true;
    });
  },
});

export default appHotelSlice.reducer;
