require("dotenv").config();

const { Configuration, OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate Blog
exports.generateBlog = async (req, res) => {
//   const { inputTopic, inputKeywords, ageGroup } = req.body;

console.log("Ruuning function")

  const systemContent = `
  You are a professional blog writer! 
  `;

  const userContent = `
    Please generate a 200 word blog about cryptocurrency.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: userContent },
      ],
      max_tokens: 200,
      temperature: 0.5,
    });
    console.log(response.choices[0].message.content);
    if (response) {
        console.log("1")
      if (response.choices[0].message.content) {
        console.log("2")
        // return res.status(200).json(response.data.choices[0].message.content);
        return res.status(200).json(response.choices[0].message.content);
      }
      console.log("3")
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
  console.log("5")
};
