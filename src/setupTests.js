import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { jsdom } from 'jsdom';
// setup enzyme with jest
import 'jest-enzyme';

configure({ adapter: new Adapter() });

// configure jsdom to be able to "mount" with enzyme
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
