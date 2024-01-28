import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const URL = 'https://reqres.in/';

export const options = {
    vus: 1000,
    iterations: 3500,
    thresholds: {
        http_req_duration: ['avg < 2000'],
        http_req_failed: ['rate < 0.1'],
    },
};

export default function(){
    const id = 1
    const email = 'farizp1607@gmail.com'
    const firstName = 'Fariz'
    const lastName = 'Prasetya'
    

    group('Performance POST', function(){
        const full_url = URL + 'api/users/'

        const payload = JSON.stringify({
            id: id,
            email: email,
            firstName: firstName,
            lastName: lastName
        });

        const params = {
            headers: {
                'Content-Type' : 'application/json',
            },
        };
        
        const postRes = http.post(full_url, payload, params);
        
        check(postRes, {
            'POST response was 201': (res) => res.status == 201,
        });
        check(postRes,{
            'response id was 201': (res) => {
                const response = JSON.parse(res.body);
                return response.id === id;
            }
        });
        check(postRes,{
            'response email was 201': (res) => {
                const response = JSON.parse(res.body);
                return response.email === email;
            }
        });
        check(postRes,{
            'response firstname was 201': (res) => {
                const response = JSON.parse(res.body);
                return response.firstName === firstName;
            }
        });
        check(postRes,{
            'response lastname was 201': (res) => {
                const response = JSON.parse(res.body);
                return response.lastName === lastName;
            }
        });
    });

    group('Performance PUT', function(){
        const full_url = URL + 'api/users/2'

        const payload = JSON.stringify({
            id: id,
            email: email,
            firstName: firstName,
            lastName: lastName
        });

        const params = {
            headers: {
                'Content-Type' : 'application/json',
            },
        };

        const putRes = http.put(full_url, payload, params);
        
        check(putRes, {
            'PUT response was 200': (res) => res.status == 200,
        });
        check(putRes,{
            'response id was 200': (res) => {
                const response = JSON.parse(res.body);
                return response.id === id;
            }
        });
        check(putRes,{
            'response email was 200': (res) => {
                const response = JSON.parse(res.body);
                return response.email === email;
            }
        });
        check(putRes,{
            'response firstname was 200': (res) => {
                const response = JSON.parse(res.body);
                return response.firstName === firstName;
            }
        });
        check(putRes,{
            'response lastname was 200': (res) => {
                const response = JSON.parse(res.body);
                return response.lastName === lastName;
            }
        });
    });
    sleep(1)
}

export function handleSummary(data) {
    return {
      "report.html": htmlReport(data),
    };
}

