
import texts from '../lib/texts';

const urlbase = 'http://bus.fdu13ss.org:10010/api';

export default {

  request(method, path, obj) {
    let config = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (obj) {
      config.body = JSON.stringify(obj);
    }

    return fetch(urlbase + path, config).catch(e => {
      console.log(e);
      throw {
        code: 500,
        message: texts.ServerError,
      };

    }).then(rsp => {
      return rsp.text().then(body => {
        let ret = { code: rsp.status };

        try {
          ret = {
            ...ret,
            ...JSON.parse(body),
          };

        } catch (e) {
          throw {
            code: 500,
            message: texts.ServerError,
          };
        }

        if (rsp.status !== 200) {
          throw ret;
        }

        return ret;
      });
    });
  },

  get(path) {
    return this.request('GET', path, null);
  },

  post(path, obj) {
    return this.request('POST', path, obj);
  },

  put(path,obj) {
    return this.request('PUT', path, obj);
  },

  del(path, obj) {
    return this.request('DELETE', path, obj);
  }
};
