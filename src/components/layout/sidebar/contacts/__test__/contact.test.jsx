import React from "react";
import renderer from "react-test-renderer";
import Contact from "../contact";

describe("contact 组件", () => {

    it("快照", () => {
        const tree = renderer
            .create(<Contact title={"test"} url={"/test"}>test</Contact>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});
