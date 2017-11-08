
describe('basket', () => {
    const itemInventoryData = require("../itemInventoryData.json");
    const ItemInventory = require("../itemInventory.js");

    const BigNumber = require("bignumber.js");

    const PricingRuleBuyOneGetOneFree = require("../pricingRuleBuyOneGetOneFree.js");
    const PricingRuleBulkPurchasesPriceDrop = require("../pricingRuleBulkPurchasesPriceDrop.js");

    const Basket = require("../basket.js");

    const itemInventory = new ItemInventory(itemInventoryData);

    const pricingRules = [
        new PricingRuleBuyOneGetOneFree({
            promoName: "buy-one-get-one-free of fruit tea",
            itemProductCode: "FR1",
        }),
        new PricingRuleBulkPurchasesPriceDrop({
            promoName: "buy 3 or more strawberries, the price should drop to £4.50",
            itemProductCode: "SR1",
            amount: 3,
            promoItemPrice: 4.50,
        })
    ];

    it('First Given TestSet', () => {

        basket = new Basket(pricingRules);
        basket.add(itemInventory.getItemByProductCode("FR1"));
        basket.add(itemInventory.getItemByProductCode("SR1"));
        basket.add(itemInventory.getItemByProductCode("FR1"));
        basket.add(itemInventory.getItemByProductCode("CF1"));

        expect(basket.total()).toBe(19.34);
    });

    it('Second Given TestSet', () => {
        basket = new Basket(pricingRules);
        basket.add(itemInventory.getItemByProductCode("FR1"));
        basket.add(itemInventory.getItemByProductCode("FR1"));

        expect(basket.total()).toBe(3.11);
    });

    it('Third Given TestSet', () => {
        basket = new Basket(pricingRules);
        basket.add(itemInventory.getItemByProductCode("SR1"));
        basket.add(itemInventory.getItemByProductCode("SR1"));
        basket.add(itemInventory.getItemByProductCode("FR1"));
        basket.add(itemInventory.getItemByProductCode("SR1"));

        expect(basket.total()).toBe(16.61);
    });
});