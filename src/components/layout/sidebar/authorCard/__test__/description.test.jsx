import React from "react";
import renderer from "react-test-renderer";
import Description from "../description";

describe("Description 组件", () => {

    it("快照", () => {
        const tree = renderer
            .create(<Description>test</Description>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});
