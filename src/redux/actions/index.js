import api from "../../apis/weatherApi";

// action types for mainPage

// export const GET_CONDITIONS = 'GET_CONDITIONS';
export const GET_CURRENT_CONDITIONS = 'GET_CURRENT_CONDITIONS';

// export const SET_IS_LIGHT_THEME = 'SET_IS_LIGHT_THEME';
// export const SET_BTN = 'SET_BTN';


// action types for useForcast
export const SUBMIT_REQUEST = 'SUBMIT_REQUEST';
export const GET_DAILY_FORCAST = 'GET_DAILY_FORCAST';
//TODO: IS_LOADING

const key = "rkJLOV4c1E2KGTB96czcEemPiMvbS75e";

//action creator for useForecast:
export const submitRequest = async (userInput) => {
    try {
        const { data } = await api.get(`/locations/v1/cities/autocomplete?apikey=${key}&q=${userInput}&language=en-us`)
        return {
            type: "SUBMIT_REQUEST",
            payload: data[0]
        }
    }
    catch (err) { console.log(err) }
}

export const getDailyForcast = async (locationCode) => {
    try {
        const {data} = await api.get(`/forecasts/v1/daily/5day/${locationCode}?apikey=${key}`);
        return {
            type: "GET_DAILY_FORCAST",
            payload: data
        }

    }
    catch (err) { console.log(err) }
}

// TODO - function to toggle C/F

//action creators for MainPage

export const getCurrentConditions = async (locationCode) => {
    try {
        const res = api.get(`currentconditions/v1/${locationCode}?apikey=${key}`)
        return ({
            type: "GET_CURRENT_CONDITIONS",
            payload: await res
        })
    }
    catch (err) { console.log(err) }
}


