import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {isMoment} from 'moment/moment';
import * as moment from 'moment/moment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, options?): any {
    return this.http.get(environment.url + endpoint, options);
  }

  post(endpoint: string, body: any, reqOpts?: any): any {
    return this.http.post(environment.url + endpoint, objectToFormData(body), reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any): any {
    body._method = 'PUT';
    return this.http.post(environment.url + endpoint, objectToFormData(body), reqOpts);
  }

  delete(endpoint: string, reqOpts?: any): any {
    const formData = new FormData();
    formData.append('_method', 'DELETE');
    return this.http.post(environment.url + endpoint, formData, reqOpts);
  }
}


function isUndefined(value) {
  return value === undefined;
}

function isNull(value) {
  return value === null;
}

function isObject(value) {
  return value === Object(value);
}

function isArray(value) {
  return Array.isArray(value);
}

function isDate(value) {
  return value instanceof Date;
}

function isBlob(value) {
  return value &&
    typeof value.size === 'number' &&
    typeof value.type === 'string' &&
    typeof value.slice === 'function';
}

function isFile(value) {
  return isBlob(value) &&
    (typeof value.lastModifiedDate === 'object' || typeof value.lastModified === 'number') &&
    typeof value.name === 'string';
}

function isFormData(value) {
  return value instanceof FormData;
}

function objectToFormData(obj, cfg?, fd?, pre?) {
  if (isFormData(cfg)) {
    pre = fd;
    fd = cfg;
    cfg = null;
  }

  cfg = cfg || {};
  cfg.indices = cfg.indices || true;
  fd = fd || new FormData();

  if (isMoment(obj)) {
    fd.append(pre, moment(obj).format('YYYY-MM-DD'));
  } else if (isUndefined(obj)) {
    return fd;
  } else if (isNull(obj)) {
    fd.append(pre, '');
  } else if (isArray(obj)) {
    if (!obj.length) {
      const key = pre + '[]';

      fd.append(key, '');
    } else {
      obj.forEach((value, index) => {
        const key = pre + '[' + (cfg.indices ? index : '') + ']';

        objectToFormData(value, cfg, fd, key);
      });
    }
  } else if (isDate(obj)) {
    fd.append(pre, obj.toISOString());
  } else if (isObject(obj) && !isFile(obj) && !isBlob(obj)) {
    Object.keys(obj).forEach((prop) => {
      const value = obj[prop];

      if (isArray(value)) {
        while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
          prop = prop.substring(0, prop.length - 2);
        }
      }

      const key = pre ? (pre + '[' + prop + ']') : prop;

      objectToFormData(value, cfg, fd, key);
    });
  } else {
    fd.append(pre, obj);
  }

  return fd;
}
