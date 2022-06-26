export class AppUtils{
    private static BASE_URL:string= "http://api.weatherapi.com/v1/";
    // searchUrl = `https://api.github.com/search/repositories?q=${trimmedSearchString}`;
    public static CURRENT_WEATHER_URL :string = `${this.BASE_URL}current.json?`
    public static FORECAST_WEATHER_URL :string = `${this.BASE_URL}forecast.json?`

    public static WEATHER_HISTORY_URL :string = "http://localhost:3000/weather"
    public static LOCATION_HISTORY_URL :string = "http://localhost:3000/location"

    public static HISTORY_ITEMS_KEY :string = "history_items" 

    public static RECENTLY_SEARCHED_CITY_KEY: string = "recent_city"

    public static DEFAULT_CITY: string = "Nairobi"
}