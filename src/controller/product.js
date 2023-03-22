import joi from "joi";
import Product from "../model/product";
const productSchema = joi.object({
  name: joi.string().required,
  price: joi.number().required,
  desc: joi.string(),
  status: joi.boolean(),
});
export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      res.json({
        message: error.details[0].message,
      });
    }
    const product = await Product.create(req.body);
    if (product.length === 0) {
      res.status(404).json({
        message: "error",
      });
    }
    res.status(200).json({
      message: "Create",
      data: product,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const product = await Product.find({});
    if (product.length === 0) {
      res.status(404).json({
        message: "error",
      });
    }
    res.status(200).json({
      message: "GET ALL",
      data: product,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
export const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.length === 0) {
      res.status(404).json({
        message: "error",
      });
    }
    res.status(200).json({
      message: "GET BY ID",
      data: product,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      res.json({
        message: error.details[0].message,
      });
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (product.length === 0) {
      res.status(404).json({
        message: "error",
      });
    }
    res.json({
      message: "UPDATE",
      data: product,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete(req.params.id);
    res.json({
      message: "DELETE",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
