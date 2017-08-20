
const Jack = require('./index');

p = new Jack({
  name: 'sampleServer'
});
p.addResource('content', ['id', 'url'], {
  get: function (id, url) {
    console.log('call get...');
    return {
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
p.start(function (data) {
  console.log('----> Listening at:', data.port);
});
console.log('Great...');