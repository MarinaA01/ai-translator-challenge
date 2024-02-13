const { OpenAI } = require('langchain/llms/openai');
const inquirer = require('inquirer');
require('dotenv').config();

const model = new OpenAI({ 
        openAIApiKey: process.env.OPENAI_API_KEY, 
        temperature: 0,
        model: 'gpt-3.5-turbo'
    });
    
    console.log({ model });

  const promptFunc = async (input) => {
    try {
        const res = await model.call(input);
        console.log(res);
    }
    catch (err) {
      console.error(err);
    }
  };

  const init = () => {
    const textToTranslate = "Hello, how are you?";
    const sourceLanguage = "en";
    const targetLanguage = "fr"; // Translate to French

    promptFunc(textToTranslate, sourceLanguage, targetLanguage)
        .then(translatedText => {
            console.log("Translated text:", textToTranslate);
    })

    .catch(error => {
        console.error("Translation failed:", error);
    });
  };
  
  init();

