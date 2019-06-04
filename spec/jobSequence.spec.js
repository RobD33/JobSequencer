let expect = require('chai').expect;
let {jobSequence} = require('../jobSequence');

describe('jobSequence()', () => {
    'use strict';
    it('returns an empty sequence when passed an empty string', () => {
        const actual = jobSequence(``);
        const expected = '';
        expect(actual).to.equal(expected);
    });

    it('Returns a sequence of one job when given a single job', () => {
        const actual = jobSequence(`a =>`);
        const expected = 'a';
        expect(actual).to.equal(expected);
    });

    it('Returns a sequence of all the jobs given when there are no dependencies', () => {
      const actual = jobSequence(`a =>
      b =>
      c =>`);
      const expected = 'abc';
      expect(actual).to.equal(expected);
    });
});