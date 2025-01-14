import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardDetails {
  cardNumber: string;
  secret: string;
  expirationDate: string;
}

interface User {
  id: number;
  userName: string;
  address: string;
  email: string;
  cardDetails: CardDetails;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<Omit<User, 'id'>>) {
      const newUser = {
        id: state.users.length + 1,
        ...action.payload,
      };
      state.users.push(newUser);
    },
    removeUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    clearUsers(state) {
      state.users = [];
    },
    updateCardDetails(
      state,
      action: PayloadAction<{ id: number; cardDetails: CardDetails }>
    ) {
      const { id, cardDetails } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.cardDetails = cardDetails;
      }
    },
  },
});

export const { addUser, removeUser, clearUsers, updateCardDetails } =
  userSlice.actions;
export default userSlice.reducer;
