import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// setup enzyme with jest
import 'jest-enzyme';

configure({ adapter: new Adapter() });
