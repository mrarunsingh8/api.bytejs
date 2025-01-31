import { Router } from "express";
import QRCode from "qrcode"

const qrRouter = Router();

qrRouter.post('/uri', (req, res) => {
    let {url} = req.body;
    if (!url) {
        return res.status(400).json({message: 'URL is required'});
    }
    QRCode.toDataURL(url, (err, url) => {
        if (err) {
            return res.status(500).json({message: 'Error generating QR code', error: err.message});
        }
        res.status(200).json({url: url});
    });
});

export default qrRouter;