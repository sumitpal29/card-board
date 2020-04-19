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
