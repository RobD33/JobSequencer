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
        const sequence = jobSequence(`a =>
        b =>
        c =>`);
        expect(sequence.split('')).to.have.members(['a', 'b', 'c'])
        expect(sequence.length).to.equal(3)
    });

    it('Returns a sequence of jobs with c positioned before b when given b => c', () => {
        const sequence = jobSequence(`a =>
        b => c
        c =>`);
        
        expect(sequence.indexOf('c')).to.be.below(sequence.indexOf('b'));
        expect(sequence.split('')).to.have.members(['a', 'b', 'c'])
        expect(sequence.length).to.equal(3)
    });
    
    it('Returns a sequence of jobs with multiple dependencies in the correct order', () => {
        const sequence = jobSequence(`a =>
        b => c
        c => f
        d => a
        e => b
        f =>`);
        expect(sequence.indexOf('f')).to.be.below(sequence.indexOf('c'));
        expect(sequence.indexOf('c')).to.be.below(sequence.indexOf('b'));
        expect(sequence.indexOf('b')).to.be.below(sequence.indexOf('e'));
        expect(sequence.indexOf('a')).to.be.below(sequence.indexOf('d'));
        expect(sequence.split('')).to.have.members(['a', 'b', 'c', 'd', 'e', 'f'])
        expect(sequence.length).to.equal(6)
    });

    it('Returns an error stating jobs cannot depend on themselves when applicable', () => {
        const actual = jobSequence(`a =>
        b =>
        c => c`);
        const expected = 'Error: jobs cannot depend on themselves';
        expect(actual).to.equal(expected);
    });
    
    it('Returns an error stating that jobs cannot have circular dependencies when applicable', () => {
        const actual = jobSequence(`a =>
        b => c
        c => f
        d => a
        e =>
        f => b`);
        const expected = 'Error: jobs cannot have circular dependencies';
        expect(actual).to.equal(expected);
    });
});