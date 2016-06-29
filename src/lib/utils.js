import texts from './texts';

export function genActionConstants(prefix, actions) {
  let ret = {};

  actions.forEach((action) => {
    ret[action] = prefix + action;
  });

  return ret;
}

function norm(ch, x) {
  return x < 10 ? ch + x : x;
}

export function describeDate(t) {
  const y = t.getFullYear();
  const m = norm(' ', t.getMonth() + 1);
  const d = norm(' ', t.getDate());

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
