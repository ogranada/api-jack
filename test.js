
const Jack = require('./index');

p = new Jack({
  name: 'sampleServer'
});
p.addResource('content', ['id', 'url'], {
  get: function*(data) {
    let r = {
      status: 200,
      response: {
        id: data.id,
        url: data.url,
        sample: 'get'
      }
    };
    return r;
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
  put: function (filter, data) {
    console.log('call put...', data);
    return {
      status: 202,
      response: {
        old_id: filter.id,
        old_url: filter.url,
        id: data.id,
        url: data.url,
        sample: 'put'
      }
    };
  },
  delete: function (id) {
    console.log('call delete...', id);
    return {
      status: 202,
      response: {
        id: id,
        sample: 'delete'
      }
    };
  },
  patch: function (data) {
    console.log('call patch...', data);
    return {
      status: 202,
      response: {
        old_id: filter.id,
        old_url: filter.url,
        id: data.id,
        url: data.url,
        sample: 'patch'
      }
    };
  }
});
p.start(function (data) {
  console.log('----> Listening at:', data.port);
});
console.log('Great...');