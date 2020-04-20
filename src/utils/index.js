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

export const clearLocalData = (id) => {
  
  try {
    if (!window) return;
    console.log('local data cleared!!')
    setTimeout(()=>window.localStorage.removeItem(id), 0);
  } catch (err) {
    console.error(err);
  }
};

export const moveArrayElement = (arr, old, to) => {
  arr.splice(to, 0, arr.splice(old, 1)[0]);
};
