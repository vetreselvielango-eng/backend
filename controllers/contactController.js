import Contact from "../models/Contact.js";

export const saveMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({
      name,
      email,
      message,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
