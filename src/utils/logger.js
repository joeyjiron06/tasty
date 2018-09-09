export const log = (...args) => {
  if (log.enabled) {
    console.log(...args);
  }
};

export const error = (...args) => {
  if (error.enabled) {
    console.error(...args);
  }
};

export const warn = (...args) => {
  if (warn.enabled) {
    console.warn(...args);
  }
};

export const enableAll = () => {
  setAllEnabled(true);
};

export const disableAll = () => {
  setAllEnabled(false);
};

function setAllEnabled(value) {
  log.enable = value;
  error.enable = value;
  warn.enable = value;
}
