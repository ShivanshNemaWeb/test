import axios from 'axios';
import swal from 'sweetalert';

// Action Types
export const FETCH_HOUSES_REQUEST = 'FETCH_HOUSES_REQUEST';
export const FETCH_HOUSES_SUCCESS = 'FETCH_HOUSES_SUCCESS';
export const FETCH_HOUSES_FAILURE = 'FETCH_HOUSES_FAILURE';

export const CREATE_HOUSE_REQUEST = 'CREATE_HOUSE_REQUEST';
export const CREATE_HOUSE_SUCCESS = 'CREATE_HOUSE_SUCCESS';
export const CREATE_HOUSE_FAILURE = 'CREATE_HOUSE_FAILURE';

export const UPDATE_HOUSE_FIELD_REQUEST = 'UPDATE_HOUSE_FIELD_REQUEST';
export const UPDATE_HOUSE_FIELD_SUCCESS = 'UPDATE_HOUSE_FIELD_SUCCESS';
export const UPDATE_HOUSE_FIELD_FAILURE = 'UPDATE_HOUSE_FIELD_FAILURE';

const API_URL = 'http://170.64.230.30/v1/house'; 
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcyMzk4MDA5OSwiZXhwIjoxNzI2NTcyMDk5LCJ0eXBlIjoiQUNDRVNTIn0.cMQPxagCQZBFbIoIu_P8gUuknEgtqwF7q1JB2E7q_RE";
// Fetch Houses Action
export const fetchHouse = () => async (dispatch) => {
  dispatch({ type: FETCH_HOUSES_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/getHomes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: FETCH_HOUSES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_HOUSES_FAILURE,
      payload: error.message,
    });
    swal('Error', 'Failed to fetch houses.', 'error');
  }
};

// Create House Action
export const createHouse = (houseData) => async (dispatch) => {
  dispatch({ type: CREATE_HOUSE_REQUEST });
  console.log(houseData)
//add createdById in houseData object
 houseData.createdById =1;
 //make rantAmount to int
  houseData.rentAmount = parseInt(houseData.rentAmount);
  try {
    const response = await axios.post(`${API_URL}/register-home`, houseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: CREATE_HOUSE_SUCCESS,
      payload: response.data,
    });
    swal('Success', 'House created successfully!', 'success');
  } catch (error) {
    dispatch({
      type: CREATE_HOUSE_FAILURE,
      payload: error.message,
    });
    swal('Error', 'Failed to create house.', 'error');
  }
};

// Update House Field Action
export const updateHouseField = (houseId, fieldName, value) => async (dispatch) => {
  dispatch({ type: UPDATE_HOUSE_FIELD_REQUEST });
  try {
    await axios.put(`${API_URL}/update-home`, {
      id: houseId,
      [fieldName]: value,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: UPDATE_HOUSE_FIELD_SUCCESS,
      payload: { houseId, fieldName, value },
    });
    swal('Success', 'Field updated successfully!', 'success');
  } catch (error) {
    dispatch({
      type: UPDATE_HOUSE_FIELD_FAILURE,
      payload: error.message,
    });
    swal('Error', 'Failed to update field.', 'error');
  }
};
