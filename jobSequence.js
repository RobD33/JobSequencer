function jobSequence (jobStructure) {
    let sequence = '';
    if (jobStructure == '') return '';
    let jobStructureArray =  formatJobStructure(jobStructure);
    jobStructureArray.forEach(job => {
        sequence = sequence + job[0]
    });
    return sequence;
};

function formatJobStructure (jobStructure) {
    let newStructure = jobStructure.split('\n').map(job => {
        return job.split('=>').map(item => item.trim())
    })
    return newStructure
}

module.exports = {jobSequence}