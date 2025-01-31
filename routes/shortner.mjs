import { Router } from "express";
import ShortnerModel from "../schemas/ShortnerModel.mjs";
import { nanoid } from "nanoid";
import redis from "../config/redis.mjs";
import QRCode from "qrcode";

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
            redis.set(shortUrl, url);
            res.status(201).json(newUrl);
        } catch (err) {
            res.status(500).json({ message: 'Error creating short url', error: err.message });
        }
    }
});

shortnerRouter.get('/:id/qrcode', async (req, res) => {
    QRCode.toDataURL(`https://re.bytejs.tech/${req.params.id}`, (err, url) => {
        if (err) {
            return res.status(500).json({ message: 'Error generating QR code', error: err.message });
        }
        res.status(200).json({ url: url });
    });
});

export default shortnerRouter;