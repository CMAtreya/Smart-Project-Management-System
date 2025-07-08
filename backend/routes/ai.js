const express = require('express');
const axios = require('axios');
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

router.post('/extract', async (req, res) => {
  const { input } = req.body;

  if (!input || input.trim().length === 0) {
    return res.status(400).json({ error: 'Input text is required' });
  }

  console.log('[INFO] Input received:', input);
  console.log('[INFO] API Key loaded:', GEMINI_API_KEY ? 'Yes' : 'No');

  try {
    const response = await axios.post(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Extract clear bullet-point requirements from the following:\n\n${input}`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!aiText) {
      console.error('[ERROR] Empty response from Gemini:', response.data);
      return res.status(500).json({ error: 'No output from Gemini API' });
    }

    const suggestions = aiText
      .split(/\n|•|-|–/)
      .map(line => line.trim())
      .filter(line => line.length > 10);

    res.json({ suggestions });

  } catch (error) {
    console.error('[GEMINI ERROR]', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get AI suggestions' });
  }
});

module.exports = router;
