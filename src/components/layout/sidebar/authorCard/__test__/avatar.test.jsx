import React from "react";
import renderer from "react-test-renderer";
import Avatar from "../avatar";

describe("Avatar 组件", () => {

    it("快照", () => {
        const tree = renderer
            .create(<Avatar src={ "/avatar.jpg" } width={ 100 } height={ 100 }/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});
