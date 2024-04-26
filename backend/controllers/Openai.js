require("dotenv").config();

const { Configuration, OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate Blog
exports.generateBlog = async (req, res) => {
  // What should I do?
  const blogLength = req.body.data.blogLength;
  const tone = req.body.data.tone;
  const topic = req.body.data.topic;
  const keyPoints = req.body.data.keypoints;
  // console.log("Received data:", blogLength, tone, topic);

  const systemContent = `
As an AI-powered content creator, your task is to assist me in crafting a blog post designed to maximize reader engagement. Please adhere to the specifications provided regarding the blog's length, tone, topic, and key points. Upon completion, present the final product with a compelling title and the content structured in JSON format. Below is an example of the JSON structure I expect:

Here is the Blog Brief, it contains the length of the blog, the tone you should use, the topic to discuss and key points to create the content around:
  blogLength,
  tone,
  topic,
  keyPoints,

Please put the response in JSON format
{
  "title": "Maximize Your Productivity: Mastering Digital Tools",
  "sections": [
    {
      "subheading": "Introduction to Digital Productivity Tools",
      "content": "Explore the world of digital productivity tools such as Trello, Asana, and Notion, and learn how integrating these tools into your daily routine can significantly boost your efficiency."
    },
    {
      "subheading": "Features and Functionalities",
      "content": "Dive deep into the specific features of each tool. Understand how Trello’s visual boards, Asana’s task prioritization, and Notion’s all-in-one workspace can cater to different productivity needs."
    },
    {
      "subheading": "Case Studies",
      "content": "Read about real-world applications of these tools in various industries. Learn from success stories that demonstrate the tangible benefits of effective tool utilization."
    },
    {
      "subheading": "Best Practices for Tool Adoption",
      "content": "Discover essential tips for smoothly integrating these digital tools into your workflow. Avoid common pitfalls and maximize the benefits with proven strategies."
    },
    {
      "subheading": "Future Trends in Digital Tools",
      "content": "Look ahead at how AI and machine learning are set to revolutionize productivity tools, making them even smarter and more adaptive to your needs."
    }
  ]
}
 
  `;

  const userContent = `
  Here is the Blog Brief, it contains the length of the blog, the tone you should use, the topic to discuss and key points to create the content around:
  blogLength: ${blogLength}',
  tone: ${tone},
  topic: ${topic},
  keyPoints: ${keyPoints},
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: userContent },
      ],
      max_tokens: 1000,
      temperature: 0.5,
    });
    console.log(response.choices[0].message.content);
    if (response) {
      if (response.choices[0].message.content) {
        // return res.status(200).json(response.data.choices[0].message.content);
        return res.status(200).json(response.choices[0].message.content);
      }
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
