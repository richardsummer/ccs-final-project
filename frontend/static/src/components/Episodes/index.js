import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function Episodes() {



  fetch('https://api.spotify.com/v1/shows/6Verqcb4xk7hVvEM2XCjkv', {
    method: 'GET', // or 'PUT'
    headers: {
      'Authorization': "Bearer BQB0gv21AJ7JTlahRHO30SbAy9-hVZec-3oHGPewQvTlkrOfbIa2Bk_qRn67SWyrp9mVYhfcDiwRieW73Cg",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  // do a fetch request for all the Episodes
  // get the latest episode and render it in the player
  // show a list of other episodes in an aside
  // when they click one of the other episodes render it to the player
  return (
    <React.Fragment>
      <div className="container" width="75%">
        <div className="row">
          <iframe src="https://open.spotify.com/embed-podcast/show/6Verqcb4xk7hVvEM2XCjkv" title="player" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
        <div className="row">
          <div className="col-8 episodes">
              <h2>Episodes</h2>
          </div>
          <div className="col-4 notes">
            <h2>Notes</h2>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Episodes;
