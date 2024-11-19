export interface Forecast{
    coord: any;
    weather: [
        {
            id: number;
            main: string;
            description: string;
            icon: string;
        }
    ];
    base: any;
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    rain:any;
    clouds:any;
    dt: any;
    sys: any;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
