import { jsdom } from 'jsdom';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
// this is basically: afterEach(cleanup)
import 'react-testing-library/cleanup-after-each';
import { disableAll } from './utils/logger';

// disable logging
disableAll();

// configure jsdom to be able to "render" with react-testing-library
if (!global.window) {
  const dom = new jsdom('<!doctype html><html><body></body></html>');
  const { defaultView } = dom;

  global.window = defaultView;
  global.document = dom;

  global.navigator = {
    userAgent: 'node.js'
  };

  function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
      .filter(prop => typeof target[prop] === 'undefined')
      .reduce(
        (result, prop) => ({
          ...result,
          [prop]: Object.getOwnPropertyDescriptor(src, prop)
        }),
        {}
      );
    Object.defineProperties(target, props);
  }
  copyProps(window, global);
}
