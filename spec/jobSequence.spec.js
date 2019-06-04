let expect = require('chai').expect;
let {jobSequence} = require('../jobSequence');

describe('jobSequence()', () => {
    'use strict';
    it('returns an empty sequence when passed an empty string', () => {
        const actual = jobSequence(``);
        const expected = '';
        expect(actual).to.equal(expected);
    });
});