/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import Icon from "../icon";

describe("Icon 组件", () => {

    it("快照", () => {
        const tree = renderer
            .create(<Icon src={ "/logo/start" } />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("当 加载矢量图成功时", (done) => {
        const wrapper = shallow(<Icon src={ "/logo/succeed" } />);
        setTimeout(() => {
            wrapper.update();
        }, 50);
        

        setTimeout(() => {
            expect(wrapper.html()).toMatch("svg succeed");
            done();
        }, 51);
    });

    it("当 加载矢量图失败时", (done) => {
        const wrapper = shallow(<Icon src={ "/logo/fail" } />);

        setTimeout(() => {
            wrapper.update();
        }, 51);

        setTimeout(() => {
            expect(wrapper.html()).toMatch("load icon error");
            done();
        }, 52);
    });

    beforeAll(() => {
        // eslint-disable-next-line no-undef
        global.fetch = jest.fn();
        global.fetch
            .mockReturnValueOnce(Promise.resolve( { text: () => Promise.resolve("svg succeed")} ))
            .mockReturnValueOnce(Promise.resolve( { text: () => Promise.resolve("svg succeed")} ))
            .mockReturnValueOnce(Promise.resolve( { text: () => Promise.reject() } ));
            
            
    });

    beforeEach(() => {
        fetch.mockClear();
    });
});


