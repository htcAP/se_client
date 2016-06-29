
import texts from '../lib/texts';

const urlbase = 'http://bus.fdu13ss.org:10010/api';

export default {

  request(method, path, obj) {
    return fetch(urlbase + path, {
      method,
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },

    }).catch(e => {
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

  get(path, obj) {
    return this.request('GET', path, obj);
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
