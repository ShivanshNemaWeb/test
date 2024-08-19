import {
  FETCH_HOUSES_REQUEST,
  FETCH_HOUSES_SUCCESS,
  FETCH_HOUSES_FAILURE,
  CREATE_HOUSE_REQUEST,
  CREATE_HOUSE_SUCCESS,
  CREATE_HOUSE_FAILURE,
  UPDATE_HOUSE_FIELD_REQUEST,
  UPDATE_HOUSE_FIELD_SUCCESS,
  UPDATE_HOUSE_FIELD_FAILURE,
} from '../actions/houseActions';

const initialState = {
  loading: false,
  house: [],
  error: null,
};

export const houseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOUSES_REQUEST:
    case CREATE_HOUSE_REQUEST:
    case UPDATE_HOUSE_FIELD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_HOUSES_SUCCESS:
      return {
        ...state,
        loading: false,
        house: action.payload,
      };

    case CREATE_HOUSE_SUCCESS:
      return {
        ...state,
        loading: false,
        house: [...state.house, action.payload],
      };

    case UPDATE_HOUSE_FIELD_SUCCESS:
      return {
        ...state,
        loading: false,
        house: state.house.map((house) =>
          house.id === action.payload.houseId
            ? { ...house, [action.payload.fieldName]: action.payload.value }
            : house
        ),
      };

    case FETCH_HOUSES_FAILURE:
    case CREATE_HOUSE_FAILURE:
    case UPDATE_HOUSE_FIELD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
