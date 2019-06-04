function jobSequence (jobStructure) {
    if (jobStructure == '') return '';
    let sequence = '', error = null;
    let formattedJobStructure =  formatJobStructure(jobStructure);
    let structureLength = formattedJobStructure.length;
    formattedJobStructure.forEach(job => {
        if (job[1] == '') sequence = sequence + job[0];
        if (job[0] == job[1]) error = 'jobs cannot depend on themselves';
    });
    while (sequence.length < structureLength && !error) {
        let jobsLeft = '', dependenciesLeft = '';
        formattedJobStructure.forEach(jobWithDependency => {
            let job = jobWithDependency[0], dependency = jobWithDependency[1];
            if (sequence.includes(dependency) && !sequence.includes(job)) {
                sequence = sequence + job
            };
            if (!sequence.includes(job) && dependency !== '') {
                jobsLeft = jobsLeft + job
                dependenciesLeft = dependenciesLeft + dependency
            };
            if(jobsLeft.length > 0){
                if (jobsLeft.split('').every(jobLeft => dependenciesLeft.includes(jobLeft))) {
                    error = 'jobs cannot have circular dependencies';
                }
            };
        })
    }
    if (error) return `Error: ${error}`
    return sequence;
};

function formatJobStructure (jobStructure) {
    let formattedJobStructure = jobStructure.split('\n').map(job => {
        return job.split('=>').map(item => item.trim());
    })
    return formattedJobStructure;
}

module.exports = {jobSequence}