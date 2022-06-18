export class WeatherLocation {
    id?:number
    name!:string
    country!: string
    lat!:number
    long!:number
    localtime!:string
    tz_id!:string
  
    constructor(name:string, country:string, lat:number, long:number, loclatime:string, tz_id:string, id?: number){
        this.name = name
        this.country = country
        this.lat = lat
        this.long = long
        this.localtime = loclatime
        this.tz_id = tz_id
        this.id = id
    }
  
}

export class WeatherCurrent {
    id?:number
    temp_c!:number
    temp_f!: number
    is_day!:number
    condition_txt!:string
    wind_kph!:number
    wind_mph!:number
    wind_degree!:number
    wind_dir!:string
    pressure_mb!:number
    pressure_in!:number
    humidity!:number
  
    constructor(temp_c:number, temp_f:number, is_day:number, condition_txt:string, wind_kph:number, wind_mph:number, wind_degree:number, wind_dir:string, pressure_mb:number, pressure_in:number, humidity:number, id?: number){
        this.temp_c = temp_c
        this.temp_f = temp_f
        this.is_day = is_day
        this.condition_txt = condition_txt
        this.wind_kph = wind_kph
        this.wind_mph = wind_mph
        this.wind_degree = wind_degree
        this.id = id

        this.wind_dir = wind_dir
        this.pressure_in = pressure_in
        this.pressure_mb = pressure_mb
        this.humidity = humidity
    }
  
}