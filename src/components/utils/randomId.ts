export function randomId() {
  return `${shortId()}${shortId()}${shortId()}`;
}

function shortId() {
  return Math.random().toString(36).slice(-6);
}
