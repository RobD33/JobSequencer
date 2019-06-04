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

    it('Returns a sequence of jobs with c positioned before b when given b => c', () => {
        const actual = jobSequence(`a =>
        b => c
        c =>`);
        const expected = 'acb';
        expect(actual).to.equal(expected);
    });
    
    it('Returns a sequence of jobs with multiple dependencies in the correct order', () => {
        const actual = jobSequence(`a =>
        b => c
        c => f
        d => a
        e => b
        f =>`);
        const expected = 'afcdbe';
        expect(actual).to.equal(expected);
    });
});