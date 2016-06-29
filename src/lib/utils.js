import {
  ToastAndroid,
} from 'react-native';
import texts from './texts';

export function genActionConstants(prefix, actions) {
  let ret = {};

  actions.forEach((action) => {
    ret[action] = prefix + action;
  });

  return ret;
}

function norm(ch, x) {
  return (x < 10) ? (ch + x) : (x);
}

export function describeDate(t) {
  const y = t.getFullYear();
  const m = norm('0', t.getMonth() + 1);
  const d = norm('0', t.getDate());

  return y + ' ' + texts.Year + ' ' + m + ' ' + texts.Month + ' ' + d + ' ' + texts.Day;
}

export function describeTime(t) {
  let h = norm('0', t.getHours());
  let m = norm('0', t.getMinutes());
  let d = texts.AM;

  if (h > 12) {
    h = h - 12;
    d = texts.PM;
  }

  return h + ':' + m + ' ' + d;
}

export function describeDuration(t) {
  let h = norm('0', t.getUTCHours());
  let m = norm('0', t.getUTCMinutes());

  if (h > 0) {
    return h + ' ' + texts.Hour + ' ' + m + ' ' + texts.Minute;
  }

  return m + ' ' + texts.Minute;
}

export function toastError(reason) {
  ToastAndroid.show(reason.message, ToastAndroid.SHORT);
}

export function describeUserList(ul) {
  if (ul.length <= 3) {
    let ret = '';
    ul.forEach((u, idx) => {
      if (idx > 1) {
        ret += ',';
      }
      ret += u.username;
    });
    ret += ' (' + ul.length + ')';
    return ret;
  }

  let ret = ul[0].username + ',';
  ret += ul[1].username + ',';
  ret += ul[2].username + ',';
  ret += '... (' + ul.length + ')';

  return ret;
}
