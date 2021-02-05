import React from 'react';
import GitHubLogin from '../GitHubLogin';
import axios from "axios";

export default function Githublog() {
    const onSuccess = response => listUsersRepos(response);
    const onFailure = response => console.error(response);
    return (
        
        <GitHubLogin clientId="51c312f590e57362affa"
        redirectUri="http://localhost:3000/"
        onSuccess={onSuccess}
        onFailure={onFailure}/>
        
    );

    function listUsersRepos(token) {
        console.log(token);
        const data = {
        email: 'hello',
        password: 'hello',
        };
        // POST https://github.com/login/oauth/access_token
        axios.post("https://github.com/login/oauth/access_token", {
            headers: {
                //Access-Control-Allow-Origin: 'http://localhost:3000',
                Authorization: 'token ' + token,
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                // code: token,
                // 'Access-Control-Allow-Origin': 'http://localhost:3000'
            }, data
        }).then(resp => {
            console.log(resp.data);
        })
        // axios.get("https://api.github.com/user/repos", {
        //     headers: {
        //         Authorization: 'token ' + token
        //     }
        // }).then(ress => {
        //     console.log(ress.data);

        //     POST https://github.com/login/oauth/access_token
        //     axios.post("https://github.com/login/oauth/access_token", {
        //         headers: {
        //             Authorization: 'token ' + token,

        //         }
        //     })
        // })
    }
   
}