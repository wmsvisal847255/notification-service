const snsArn = process.env.snsArn;

const SNS_TOPICS = {
    ERROR_LOGGER: snsArn
}


module.exports = {
    SNS_TOPICS
}