import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heroes: [], 
  heroesLoadingStatus: 'idle', 
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState, 
  reducers: {
    heroesFetching: (state) => {
      state.heroesLoadingStatus = 'loading';
    },
    heroesFetched: (state, action) => {
      state.heroesLoadingStatus = 'idle';
      state.heroes = action.payload;
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = 'idle';
      state.heroesLoadingStatus = 'error';
    },
    heroCreated: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroDeleted: (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;

export const { heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroDeleted } = actions;

export const addHeroes = (request, newHero) => (dispatch) => {
  request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
    .then((res) => console.log(res, 'Отправка успешна'))
    .then(dispatch(heroCreated(newHero)))
    .catch((err) => console.log(err));
}

export const onDeleteHeroes = (request, id) => (dispatch) => {
  request(`http://localhost:3001/heroes/${id}`, 'DELETE')
    .then((data) => console.log(data, 'Deleted'))
    .then(dispatch(heroDeleted(id)))
    .catch((err) => console.log(err));
}
