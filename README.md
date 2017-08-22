
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
  get: function*(data) { // you can use a generator or a simple function
    console.log('call get...', data);
    return {  // you should return an object with status code and response value
      status: 200,
      response: {
        id: data.id,
        url: data.url,
        sample: 'get'
      }
    };
  },
  post: function (data) {
    console.log('call post...', data);
    return {
      status: 201,
      response: {
        id: data.id,
        url: data.url,
        sample: 'post'
      }
    };
  },
  put: function (data) {
    console.log('call put...', data);
    return {
      status: 202,
      response: {
        id: data.id,
        url: data.url,
        sample: 'put'
      }
    };
  },
  delete: function (data) {
    console.log('call delete...', data);
    return {
      status: 202,
      response: {
        id: data.id,
        url: data.url,
        sample: 'delete'
      }
    };
  },
  patch: function (data) {
    console.log('call patch...', data);
    return {
      status: 202,
      response: {
        id: data.id,
        url: data.url,
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

