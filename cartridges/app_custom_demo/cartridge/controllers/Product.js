'use strict';

var server = require('server');
server.extend(module.superModule);

var cache = require('*/cartridge/scripts/middleware/cache');

server.get('MiniDetails', cache.applyPromotionSensitiveCache, function (req, res, next) {
    var ProductMgr = require('dw/catalog/ProductMgr');
    var URLUtils = require('dw/web/URLUtils');
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var productId = req.querystring.pid;
    var apiProduct = productId ? ProductMgr.getProduct(productId) : null;

    if (!apiProduct || !apiProduct.online) {
        res.setStatusCode(404);
        res.json({ error: 'Product not found.' });
        return next();
    }

    var product = ProductFactory.get({ pid: productId, pview: 'tile' });
    res.render('product/miniDetails', {
        product: product,
        productUrl: URLUtils.url('Product-Show', 'pid', productId).toString(),
        display: { ratings: true }
    });

    return next();
});

module.exports = server.exports();
