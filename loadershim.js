/* eslint-disable no-undef */
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

global.___loader = {
    enqueue: jest.fn(),
};

Enzyme.configure({ adapter: new Adapter() });