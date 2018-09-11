import Axios from 'Axios'

/**
 * ACTION TYPES
 */
const GET_GIFS = 'GET_GIFS'

/**
 * INITIAL STATE
 */
const defaultGifs = []

/**
 * ACTION CREATORS
 */
const getGifs = gifs => ({type: GET_GIFS, gifs})

/**
 * THUNK CREATORS
 */
export const getGifsThunk = (query) => async dispatch => {
  try {
    const res = await Axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=3Scw7m82zJbfSn8aipUENSrHBRCTd2Ta`);
    const data = await res.data.data;
    return await dispatch(getGifs(data || defaultGifs))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultGifs, action) {
  switch (action.type) {
    case GET_GIFS:
      return action.gifs
    default:
      return state
  }
}
