function jobSequence (jobStructure) {
    let sequence = '', circular = false;
    if (jobStructure == '') return '';
    let jobStructureArray =  formatJobStructure(jobStructure);
    let structureLength = jobStructureArray.length;
    jobStructureArray.forEach(job => {
        if (job[1] == '') sequence = sequence + job[0]
        if (job[0] == job[1]) circular = true;
    });
    if (circular) return 'Error: jobs cannot depend on themselves'
    while (sequence.length < structureLength && circular == false) {
        let jobsLeft = '', dependenciesLeft = '';
        jobStructureArray.forEach(jobWithDependency => {
            if (sequence.includes(jobWithDependency[1]) && !sequence.includes(jobWithDependency[0])) {
                sequence = sequence + jobWithDependency[0]
            }
            if (!sequence.includes(jobWithDependency[0]) && jobWithDependency[1] !== '') {
                jobsLeft = jobsLeft + jobWithDependency[0]
                dependenciesLeft = dependenciesLeft + jobWithDependency[1]
            }
            if(jobsLeft.length > 0){
                if (jobsLeft.split('').every(job => dependenciesLeft.includes(job))) {
                    circular = true
                }
            }
        })
    }
    if (circular) return 'Error, jobs cannot have circular dependencies'
    return sequence;
};

function formatJobStructure (jobStructure) {
    let newStructure = jobStructure.split('\n').map(job => {
        return job.split('=>').map(item => item.trim())
    })
    return newStructure
}

module.exports = {jobSequence}