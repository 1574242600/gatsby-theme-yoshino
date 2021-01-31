import React from "react";
import renderer from "react-test-renderer";
import Name from "../name";

describe("Name 组件", () => {

    it("快照", () => {
        const tree = renderer
            .create(<Name name={"test"} ><div>test</div></Name>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});
