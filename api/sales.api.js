const { Sales } = require('../models/sales')
const { Router } = require('express')

const router = Router();

router.get('/sales', async (req, res) => {
   const { storeLocation, customer_age, customer_emailDomain, items_tags, couponUsed } = req.query;

   const dbQuery = {};

   if (storeLocation) {
      if (storeLocation) {
         dbQuery.storeLocation = { $in: [/(\w+)/g] }
      }
      if (storeLocation) {
         dbQuery.storeLocation = { $in: [/[[:<:]]tex/g] }
      }
      if (storeLocation) {
         dbQuery.storeLocation = { $in: [/tex[[:>:]]/g] }
      }
      if(storeLocation) {
         dbQuery.storeLocation = { $in: [/te.[[:>:]].[[:<:]]x/g] }
      }
   }

   if (customer_age) {
      const { gt, lt } = JSON.parse(customer_age);
      if (gt && lt && lt < gt) {
         return res.status(400).send({ message: 'lt should be greater than gt' })
      } else {
         dbQuery['customer.age'] = { $gte: gt, $lte: lt }
      }
      if (gt && !lt) {
         dbQuery['customer.age'] = { $gte: gt }
      }
      if (!gt && lt) {
         dbQuery['customer.age'] = { $lte: lt }
      }
   }

   if (customer_emailDomain) {
      dbQuery['customer.email'] = { $regex: new RegExp(`@${customer_emailDomain}`) }
   }

   if (items_tags) {
      dbQuery['items.tags'] = { $in: items_tags.split(",") };
   }

   if (couponUsed) {
      dbQuery.couponUsed = couponUsed;
   }

   const docs = await Sales.find(dbQuery);

   return res.status(200).send(docs);

});

module.exports = {
   router
};

