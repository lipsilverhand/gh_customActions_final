const core = require('@actions/core');
const exec = require('@actions/exec');
const { v4: uuidv4 } = require('uuid'); // Import the v4 method from the uuid module

function run() {
    try {
        const bucket = core.getInput('bucket', { required: true });
        const bucketRegion = core.getInput('bucket-region', { required: true });
        const distFolder = core.getInput('dist-folder', { required: true });

        const s3Uri = `s3://${bucket}`;
        exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

        // Generate a UUID
        const uuid = uuidv4();
        core.info('Generated UUID:', uuid); // Log the generated UUID

        core.info('Deployment completed successfully.');
    } catch (error) {
        core.setFailed(`Deployment failed with error: ${error.message}`);
    }
}

run();
