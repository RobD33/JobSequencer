function jobSequence (jobStructure) {
    let sequence = '';
    if (jobStructure == '') return '';
    let jobStructureArray =  formatJobStructure(jobStructure);
    jobStructureArray.forEach(job => {
        if (job[1] == '') sequence = sequence + job[0]
    });
    while (sequence.length < jobStructureArray.length) {
        jobStructureArray.forEach(jobWithDependency => {
            if (sequence.includes(jobWithDependency[1]) && !sequence.includes(jobWithDependency[0])) {
                sequence = sequence + jobWithDependency[0]
            }
        })
    }
    return sequence;
};

function formatJobStructure (jobStructure) {
    let newStructure = jobStructure.split('\n').map(job => {
        return job.split('=>').map(item => item.trim())
    })
    return newStructure
}

module.exports = {jobSequence}