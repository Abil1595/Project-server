// utils/apiKeyUtils.js
const crypto = require('crypto');
const ApiKey = require('../models/apiKeyModel'); // Adjust the path based on your folder structure

const generateApiKey = async () => {
    const apiKey = crypto.randomBytes(32).toString('hex'); // Generate a random API key
    const newApiKey = new ApiKey({ key: apiKey });
    await newApiKey.save();
    console.log('API Key generated:', apiKey); // Log the generated API key (optional)
    return apiKey;
};

module.exports = {
    generateApiKey,
};
 