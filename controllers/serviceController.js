import Service from "../models/Service.js";

// ✅ GET all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

// ✅ POST new service (for testing / admin)
export const addService = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    const newService = new Service({
      name,
      description,
      price,
      image,
    });

    await newService.save();

    res.status(201).json({ message: "Service added", service: newService });
  } catch (error) {
    res.status(500).json({ message: "Service creation failed" });
  }
};
