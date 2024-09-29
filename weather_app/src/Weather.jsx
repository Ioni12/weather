import { Search, Cloud, Droplet, Wind } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useState } from "react";

const API_KEY = "1b2f6b22ca6eb628cb196ca5b7b29bc1";

export default function Weather(){
    const [ city, setCity ] = useState("");
    const [ weather, setWeather ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            if(!res.ok){
                throw new Error("failed to fetch");
            }
            const data = await res.json();
            setWeather(data);
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-slate-800 max-w-md mx-auto mt-20 p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-300">Weather app</h1>
                <div className="flex mb-4">
                    <Input type="text" value={city} onChange={(e) => {setCity(e.target.value)}} placeholder="enter city name" className="flex-grow mr-2 font-bold"/>
                    <Button onClick={fetchWeather} disabled={loading} className="bg-slate-600"><Search size={20} color="white"/></Button>
                </div>
                {loading && <p>Loading ...</p>}
                {error && <p className="text-red-600">{error}</p>}
                {weather && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{weather.name}, {weather.sys.country}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center mb-2 ml-auto">
                                <Cloud className="ml-auto mr-2"/>
                                <span className="mr-auto">{weather.weather[0].description}</span>
                            </div>
                            <p className="text-3xl font-bold mb-2">{Math.round(weather.main.temp)}°C</p>
                            <div className="flex items-center mb-2 ">
                                <Droplet className="mr-2 ml-auto"/>
                                <span className="mr-auto">Humidity: {weather.main.humidity}%</span>
                            </div>
                            <div className="flex items-center">
                                <Wind className="mr-2 ml-auto"/>
                                <span className="mr-auto">Wind: {weather.wind.speed} m/s</span>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
     
        </>
    )
}