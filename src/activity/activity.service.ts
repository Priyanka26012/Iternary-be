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
    async getActivity(city="auckland") {
        const loginCreds: { token: string } = await this.loginActivity("taratravel-EXOZ-api", "!4@R8kTAy3")
        const token ="eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MTgwMjMxNTIsImlzcyI6ImludGVybmFsLnNlY3VyaXR5LnRpY2tldG1hdGVzLm5ldCIsInN1YiI6InRhcmF0cmF2ZWwtRVhPWi1hcGkiLCJqdGkiOiI0Mjc0NS0xUGZvRW9vR0JFRU5teDBSeUtUMkFnPT0iLCJmaXIiOiJUYXJhIFRvdXJzICYgVHJhdmVsIE5aIEx0ZCIsImxhcyI6IkFQSSIsInVpZCI6NDI3NDUsInJvbCI6IkNBUEFDSVRZX0FQSV9BQ0NFU1MiLCJvaWQiOjE1ODE2LCJvbmEiOiJUYXJhIFRvdXJzICYgVHJhdmVsIE5aIEx0ZCIsInJlZyI6MzUsInJlbSI6IjEifQ.5yNh6QQpm6XbqOKrg2C8Hkmwhko7HPTWOCxxvdUTUqHrBVSsxPxFACifQC2z8-CQjJ_YaT_zOKQqTLL2BxQMJQ"|| loginCreds.token;
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
       return fetch(`https://www.ticketmates.net/en/api/v3/${city}/activities`, requestOptions)
          .then(response => response.json())
          .then(result =>result)
          .catch(error => {
            throw error;
          });
    }
}
