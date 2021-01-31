/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const gatsby = jest.requireActual("gatsby");

module.exports = {
    ...gatsby,
    graphql: jest.fn(),
    StaticQuery: jest.fn(),
    useStaticQuery: jest.fn(),
};