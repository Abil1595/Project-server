// controllers/apiKeyController.js
const { generateApiKey } = require('../utils/apiKeyUtils'); // Adjust the path

exports.createApiKey = async (req, res) => {
    try {
        const apiKey = await generateApiKey();
        res.status(201).json({
            success: true,
            apiKey: apiKey // Send back the generated API key
        }); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate API key' });
    } 
};  
 