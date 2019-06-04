function jobSequence (jobStructure) {
    if (jobStructure == '') return '';
    let sequence = '', error = null;
    let formattedJobStructure =  formatJobStructure(jobStructure);
    while (sequence.length < formattedJobStructure.length && !error) {
        let jobsLeft = '', dependenciesLeft = '';
        formattedJobStructure.forEach(jobWithDependency => {
            let job = jobWithDependency[0], dependency = jobWithDependency[1];
            if (job == dependency) {
                error = 'jobs cannot depend on themselves';
                return;
            };
            if ((dependency == '' || sequence.includes(dependency)) && !sequence.includes(job)) {
                sequence = sequence + job;
            };
            if (!sequence.includes(job)) {
                jobsLeft = jobsLeft + job;
                dependenciesLeft = dependenciesLeft + dependency;
            };
        })
        if(jobsLeft.length){
            if (jobsLeft.split('').every(jobLeft => dependenciesLeft.includes(jobLeft))) {
                error = 'jobs cannot have circular dependencies';
            };
        };
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