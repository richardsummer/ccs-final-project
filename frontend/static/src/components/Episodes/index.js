import React from 'react';

function Episodes() {

  /**
   * This is an example of a basic node.js script that performs
   * the Client Credentials oAuth2 flow to authenticate against
   * the Spotify Accounts.
   *
   * For more information, read
   * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
   */

  var request = require('request'); // "Request" library

  var client_id = '77bc348feb984dd98e7a00c0a703a76a'; // Your client id
  var client_secret = 'a978551bea3841aab6a3adfc45bfeec5'; // Your secret

  // your application requests authorization
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/shows/6Verqcb4xk7hVvEM2XCjkv',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body);
      });
    }
  });

  // fetch('https://api.spotify.com/v1/shows/6Verqcb4xk7hVvEM2XCjkv', {
  //   method: 'GET', // or 'PUT'
  //   headers: {
  //     'Authorization': "Bearer BQBM-N3Oc6inIatSf3ahKOfVY7tGxdcaxCeM9vP6uHItVBN16KjRIEAixyrFOQqLd2Y75lA1osPwRYHFw1Sa-5Ax2jHrcSA1iHBaGbFBiYdCDYOKb-CGBkYjDyHJgZTFXvJxMzeMefQN5kHCzXMsaX7Njwf678vQdMBBkAsVkG5wwJ-R1wj6ag",
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(),
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Success:', data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // do a fetch request for all the Episodes
  // get the latest episode and render it in the player
  // show a list of other episodes in an aside
  // when they click one of the other episodes render it to the player
  return (
    <React.Fragment>
      <div className="row">
        <iframe src="https://open.spotify.com/embed-podcast/show/6Verqcb4xk7hVvEM2XCjkv" title="player" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
      <div className="row">
        <div className="col-8">
          <h2>Episodes</h2>
        </div>
        <div className="col-4">
          <h2>Notes</h2>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Episodes;


// import React, {Component} from 'react';
//
// class Episodes extends Component {
//   render () {
//     return(
//     <div className="Episodes">
//       <h1>Episodes</h1>
//       <iframe src="https://open.spotify.com/embed-podcast/show/6Verqcb4xk7hVvEM2XCjkv" title="player" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
//     </div>
//   )
//   };
// }
//
// export default Episodes;
