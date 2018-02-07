import Alert from 'react-s-alert';

const showError = (text) => {
  if (text) {
    Alert.error(text, {
      timeout: 7000,
    });
  }
};

const showWarning = (text) => {
  if (text) {
    Alert.warning(text, {
      timeout: 7000,
    });
  }
};

const showInfo = (text) => {
  if (text) {
    Alert.info(text, {
      timeout: 5000,
    });
  }
};

const showSuccess = (text) => {
  if (text) {
    Alert.success(text, {
      timeout: 5000,
    });
  }
};

const playSunny = (text) => {
  if (text) {
    Alert.success(text, {
      beep: '/sounds/sunny.mp3',
      timeout: 5000,
    });
  }
};

export { Alert, showError, showWarning, showInfo, showSuccess, playSunny };
