export const debounce = function (fn, delay) {
  let timer = null;

  return function () {
    let context = this;
    let args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(() => fn.apply(context, args), delay);
  };
};

export const adjustTextAreaheight = (target, cb) => {
  if (target.scrollHeight > target.clientHeight + 5) {
    target.style.height = "auto";
    target.style.height = target.scrollHeight - 20 + "px";
  }

  cb && cb(target.value);
};

export const getLocalData = (key) => {
  try {
    if (!window) return;
    return window.localStorage.getItem(key);
  } catch (err) {
    console.error(err);
  }
};

export const setLocalData = (key, value) => {
  try {
    if (!window) return;
    window.localStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
};

export const clearLocalData = () => {
  try {
    if (!window) return;
    window.localStorage.clear();
  } catch (err) {
    console.error(err);
  }
};
