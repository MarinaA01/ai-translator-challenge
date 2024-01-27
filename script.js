const express = require('express');
const axios = require('axios');
const { async } = require('rxjs');
require('dotenv').config();

const app = express();
const port = 3001;

app.get('/translate', async (req, res) => {
    const { text, targetLanguage } = req.query;
    const apiKey = process.env.OPENAI_API_KEY;
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: `Translate the following English text to ${targetLanguage}: ${text}`,
            max_tokens: 100,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        const translation = response.data.choices[0].text.trim();
        res.send(translation);
    } catch (error) {
        console.error(error);
        res.status(500).send('Translation failed');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})