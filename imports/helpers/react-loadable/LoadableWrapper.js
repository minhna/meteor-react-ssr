import Loadable from 'react-loadable';

import Loading from './loading.js';

export default function LoadableWrapper(opts) {
  return Loadable({
    loading: Loading,
    delay: 200,
    ...opts,
  });
}
