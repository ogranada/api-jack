
# Jack

A simple comunication tool for microservices based on HTTP via REST.


## How to use it
```javascript

const Jack = require('jack');

p = new Jack({
  name: 'sampleServer'
});

p.addResource('content', ['id', 'url'], {
  // you can implement GET, POST, PUT, DELETE and PATCH to comunicate your microservicess passing information accross them.
  get: function*(id, url) { // you can use a generator or a simple function
    console.log('call get...');
    return {  // you should return an object with status code and response value
      status: 200,
      response: {
        id: id,
        url: url,
        sample: 'get'
      }
    };
  },
  post: function (id, url) {
    console.log('call post...', {id, url});
    return {
      status: 201,
      response: {
        id: id,
        url: url,
        sample: 'post'
      }
    };
  },
  put: function (id, url) {
    console.log('call put...', {id, url});
    return {
      status: 202,
      response: {
        id: id,
        url: url,
        sample: 'put'
      }
    };
  },
  delete: function (id, url) {
    console.log('call delete...', {id, url});
    return {
      status: 202,
      response: {
        id: id,
        url: url,
        sample: 'delete'
      }
    };
  },
  patch: function (id, url) {
    console.log('call patch...', {id, url});
    return {
      status: 202,
      response: {
        id: id,
        url: url,
        sample: 'patch'
      }
    };
  }
});

// now start your listener
p.start(function (data) {
  console.log('----> Listening at:', data.port);
});
```

