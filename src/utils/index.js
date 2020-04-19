export const debounce = function (fn, milliseconds) {
  let timer = null,
    wait = milliseconds;

  return function () {
    let self = this,
      args = arguments;

    function complete() {
      fn.apply(self, args);
      timer = null;
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(complete, wait);
  };
};

export const adjustTextAreaheight = (target, cb) => {
  const textarea = target;
  textarea.rows = 1;
  if (textarea.scrollHeight > textarea.clientHeight)
    textarea.rows = textarea.scrollHeight / textarea.clientHeight;

  cb && cb(target.value);
};
