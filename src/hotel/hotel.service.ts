import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HotelService {
    async fetchCity() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic VEFSQVRPVVJTTlp0ZXN0OlRhckA2NDMyMTUyMw==");
        const raw = JSON.stringify({
            "CountryCode": "NZ"
        });
        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect // Explicitly type redirect
        };
        return fetch("http://api.tbotechnology.in/TBOHolidays_HotelAPI/CityList/", requestOptions)
            .then((response) => response.json())
            .then((result) => result)
            .catch((error) => {
                throw new HttpException("Cache miss", HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }
    async fetchHotelByCode(code: string): Promise<any> {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic VEFSQVRPVVJTTlp0ZXN0OlRhckA2NDMyMTUyMw==");
        const raw = JSON.stringify({
            "CityCode": code,
            "IsDetailedResponse": "false"
        });
        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect
        };
        try {
            const response = await fetch("http://api.tbotechnology.in/TBOHolidays_HotelAPI/TBOHotelCodeList/", requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Fetch error:', error);
            throw new Error('Failed to fetch hotel data');
        }
    }
    async fetchHotelDataByHotelCode(code: string): Promise<any> {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic VEFSQVRPVVJTTlp0ZXN0OlRhckA2NDMyMTUyMw==");
        const raw = JSON.stringify({
            "CityCode": code,
            "IsDetailedResponse": "false"
        });
        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect
        };
        try {
            const response = await fetch("http://api.tbotechnology.in/TBOHolidays_HotelAPI/TBOHotelCodeList/", requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Fetch error:', error);
            throw new Error('Failed to fetch hotel data');
        }
    }
}
