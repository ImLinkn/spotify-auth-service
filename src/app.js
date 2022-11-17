require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');
const express = require('express');
const moment = require('moment');
const querystring = require('querystring');

const redirect_uri = process.env.REDIRECT_URI;
const serverPort = process.env.SERVER_PORT || 8081;
const app = express();

let accessToken = null;
let state = null;

app.get('/callback', (req, res) => {
  const code = req.query.code || null;

  if (!state || state !== req.query.state) {
    res.redirect(`/#${  querystring.stringify({ error: 'state_mismatch' })}`);
  } else {
    axios({
      method: 'POST',
      url: process.env.SPOTIFY_TOKEN_ENDPOINT,
      data: querystring.stringify({
        code,
        grant_type: 'authorization_code',
        redirect_uri
      }),
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(response => {
        if (response.status === 200) {
          const { access_token, token_type, scope, expires_in, refresh_token } = response.data;
          const expires_in_timestamp = moment().add(expires_in, 'seconds');
          accessToken = { access_token, token_type, scope, expires_in, expires_in_timestamp, refresh_token };
          res.redirect('/token');
        } else {
          res.send(response);
        }
      })
      .catch(error => {
        res.send(error);
      });
  }
});

app.get('/login', (req, res) => {
  state = crypto.randomBytes(16).toString('hex');
  res.redirect(`${process.env.SPOTIFY_AUTHORIZATION_ENDPOINT}?${
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: process.env.SCOPES,
      redirect_uri,
      state
    })}`);
});

app.get('/token', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const now = moment();
  if (!accessToken) {
    res.redirect('/login');
  } else if (moment(now).isAfter(accessToken.expires_in_timestamp)) {
    res.redirect('/token/refresh');
  } else {
    res.send(accessToken);
  }
});

app.get('/token/refresh', (req, res) => {
  const { refresh_token } = accessToken;
  axios({
    method: 'POST',
    url: process.env.SPOTIFY_TOKEN_ENDPOINT,
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token
    }),
    headers: {
      'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
    .then(response => {
      const { access_token, token_type, scope, expires_in } = response.data;
      const expires_in_timestamp = moment().add(expires_in, 'seconds');
      accessToken = { access_token, token_type, scope, expires_in, expires_in_timestamp, refresh_token };
      res.redirect('/token');
    })
    .catch(error => {
      res.send(error);
    });
});

app.listen(serverPort, () => {
  console.log(`Server is listening on port ${serverPort}`);
});
