import { Request, Response } from "express"
import { FeatureModel } from "../db/Feature.ts";
import { handleHttpError, HttpError } from "../HttpError.ts";

export const createFeature = async (req:Request, res:Response) => {
    try {
        const {header, category, body, linkText, ref} = req.body;
        const newFeature = new FeatureModel({
            header: header,
            category: category,
            body: body
        });
        if (linkText) {
            newFeature.linkText = linkText;
        }
        if (ref) {
            newFeature.ref = ref;
        }
        await newFeature.save();
        res.status(201).json(newFeature).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

export const viewFeature = async (req:Request, res:Response) => {
    try {
        const feature = await FeatureModel.findById(req.params.featId).orFail(new HttpError(404, "not found"));
        res.status(200).json(feature).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

export const listFeature = async (req:Request, res:Response) => {
    try {
        const features = await FeatureModel.find();
        res.status(200).json(features).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

export const updateFeature = async (req:Request, res:Response) => {
    try {
        const {header, category, body, linkText, ref} = req.body;
        const feature = await FeatureModel.findById(req.params.featId).orFail(new HttpError(404, "not found"));
        if (header) {
            feature.header = header;
        }
        if (category) {
            feature.category = category;
        }
        if (body) {
            feature.body = body;
        }
        if (linkText) {
            feature.linkText = linkText;
        }
        if (ref) {
            feature.ref = ref;
        }
        feature.save();
        res.status(200).json(feature).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

export const deleteFeature = async (req:Request, res:Response) => {
    try {
        await FeatureModel.findById(req.params.featId).deleteOne().orFail(new HttpError(404, "not found"));
        res.status(200).json({ message: "feature deleted"}).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};