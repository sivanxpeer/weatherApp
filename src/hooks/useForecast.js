import { useState, useEffect } from "react";
import api from "../apis/weatherApi"
import Card from "../components/card/Card"
import "../components/mainPage/MainPage.css";
// import dotenv from "";

const useForecast = () => {
    const [forecast, setForecast] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [text, setText] = useState("");
    const [category, setCategory] = useState("");
    const [locationCode, setLocationCode] = useState("215854");
    const [locationsList, setLocationsList] = useState([]); //object contains location name and code 
    const [locationsMatches, setLocationsMatches] = useState([])



    const [today, setToday] = useState("");
    const [city, setCity] = useState("Tel Aviv");
    const min = 0;
    const max = 0;
    const key = "PW20yXzJQu1feJXGIGo24yvgzua2AxIA";

    // const key = process.env.REACT_APP_SIVAN_PEER;
    // console.log(process.env.SIVAN_PEER)
    const submitRequest = async (userInput) => {
        const { data } = await api.get(`/locations/v1/cities/autocomplete?apikey=${key}&q=${userInput}&language=en-us`)
        if (data.length === 0) {
            console.log("no such location");
        }
        else {
            setLocationsMatches(data);
            setLocationsList(data);
            // autoCompleteToDisplay(locationsList);

            console.log(data);
            const loc = data[0].Key;
            setCity(data[0].LocalizedName);
            setLocationCode(loc);
            setisLoading(true);
            const df = await getDailyForcast(loc);
            if (df.length === 0) {
                console.log("something went wrong");
            }
            else {
                setForecast(df.DailyForecasts);
                forecastToCards(df.DailyForecasts);
                setisLoading(false)
            }
            return data;
        }
    }


    const autoCompleteToDisplay = async (locations) => {
        return locations.map((location) => {
            return (<div className="auto-complete" style={{ width: "400px", height: "400px", display: "inline-block" }}>
                {location.LocalizedName}
                {location.key}
            </div>)
        })
    }


    const getDailyForcast = async (locationCode) => {
        setisLoading(true);
        const response = await api.get(`/forecasts/v1/daily/5day/${locationCode}?apikey=${key}`);
        setisLoading(false);
        const dailyData = response.data.DailyForecasts;
        setForecast(dailyData);
        const txt = response.data.Headline.Text;
        setText(txt);
        const cat = response.data.Headline.Category;
        setCategory(cat);
        const date = response.data.Date;
        setToday(date);
        return response.data;
        // // TODO - function to toggle C/F
    }

    useEffect(() => {
        setLocationCode(locationCode);
        getDailyForcast(locationCode);

    }, [setForecast, locationCode, locationsList]);// eslint-disable-line react-hooks/exhaustive-deps

    const forecastToCards = (forecast) => {
        return forecast.map((day) => {
            return (<Card
                key={day.Date}
                text={day.Day.IconPhrase}
                today={day.Date}
                city={city}
            />)

        })
    }

    const showFormatedDate = (date) => {
        let res = ''
        let currentDate = new Date(date);
        // res = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + ', ' + (currentDate.getHours()).toPrecision(2) + ':' + (currentDate.getMinutes());
        res = currentDate.getDate() + '/' + (currentDate.getMonth() + 1);

        return res
    }

    const getDayName = (date) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
        return days[new Date(date).getDay()]
    }

    return {
        forecast, setForecast, category, text, isLoading, min, max, locationCode, key, locationsMatches, setLocationsMatches, setCity,
        getDailyForcast, submitRequest, locationsList, setLocationsList, autoCompleteToDisplay, showFormatedDate, today, setToday, forecastToCards, city, getDayName
    }
}

export default useForecast;