import { Router } from "express";
import ShortnerModel from "../schemas/ShortnerModel.mjs";
import { nanoid } from "nanoid";

const shortnerRouter = Router();

shortnerRouter.get('/', async (req, res) => {
    try {
        const urls = await ShortnerModel.find();
        res.status(200).json(urls);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching urls', error: err.message });
    }

});

shortnerRouter.post('/', async (req, res) => {
    let { url } = req.body;
    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }
    const isUrlExists = await ShortnerModel.findOne({ url });
    if (isUrlExists) {
        return res.status(200).json(isUrlExists);
    } else {
        try {
            const shortUrl = nanoid(6);
            const newUrl = new ShortnerModel({ url, shortUrl });
            await newUrl.save();
            res.status(201).json(newUrl);
        } catch (err) {
            res.status(500).json({ message: 'Error creating short url', error: err.message });
        }
    }
});

export default shortnerRouter;