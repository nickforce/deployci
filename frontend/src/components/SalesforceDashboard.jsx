import React, { useEffect, useState } from "react";

export default function SalesforceDashboard() {

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        login();
    };

    function login() {
        var loginUrl = 'https://login.salesforce.com/'
        var clientId = '3MVG9g9rbsTkKnAVCCOCGL4zQsDk.nM4Ol4dwEUbVs2VbghDEs.0PI6PhWxvp0KtXhVcNC.xGnvznSWGS5LhN'
        var redirectURI = 'http://localhost:3000/oauth2/callback'
        http://localhost:3000/oauth2/callback'
        var url = loginUrl + 'services/oauth2/authorize?display=popup&response_type=token'
                    + '&client_id=' + encodeURIComponent(clientId)
                    + '&redirect_uri=' + encodeURIComponent(redirectURI);
        window.open(url);
    }
    function oauthCallback(response) {
        if (response && response.access_token) {
            // client.setSessionToken(response.access_token,
            //                        apiVersion,
            //                        response.instance_url);
            console.log('OAuth authentication succeeded');
        } else {
            alert("AuthenticationError: No Token");
        }
    }

    return (
        <div>
            <a href="#" onClick={handleSubmit}>Login with Salesforce</a>
        </div>
    );
}

