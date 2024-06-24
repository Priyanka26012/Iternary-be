import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ActivityService {
  async loginActivity(username: string, password: string): Promise<{ token: string } | any> {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    return fetch("https://www.ticketmates.net/authentication/login", requestOptions)
      .then(response => response.json())
      .then(result => result)
      .catch(error => { throw error });
  }
  async getActivity(city) {
    const loginCreds: { token: string } = await this.loginActivity("taratravel-EXOZ-api", "!4@R8kTAy3")
    const token = loginCreds.token;
    if (!token?.length) {
      return HttpException.createBody(null, "Invalid Token", 400)
    }
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    return fetch(`https://www.ticketmates.net/en/api/v3/${city}/activities`, requestOptions)
      .then(response => response.json())
      .then(result => result)
      .catch(error => {
        throw error;
      });
  }
  async getActivityDetails(city:string,productURL:string) {
    const loginCreds: { token: string } = await this.loginActivity("taratravel-EXOZ-api", "!4@R8kTAy3")
    const token = loginCreds.token;
    if (!token?.length) {
      return HttpException.createBody(null, "Invalid Token", 400)
    }
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions:any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://www.ticketmates.net/en/api/v3/${city}/${productURL}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
}
