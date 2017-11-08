
describe('pricingRuleBuyOneGetOneFree', () => {
    const ItemInventory = require("../itemInventory.js");
    const PricingRuleBuyOneGetOneFree = require("../pricingRuleBuyOneGetOneFree.js");
    const PricingRule = require("../pricingRule.js");
    const ItemInventoryData = [{
        productCode: "FR1",
        name: "Fruit tea",
        price: 3.11
    },
    {
        productCode: "SR1",
        name: "Strawberries",
        price: 5.00
    },
    {
        productCode: "CF1",
        name: "Coffee",
        price: 11.23
    }];

    const itemInventory = new ItemInventory(ItemInventoryData);

    it('Applies Discount', () => {
        const itemArray = [
            itemInventory.getItemByProductCode("FR1"),
            itemInventory.getItemByProductCode("SR1"),
            itemInventory.getItemByProductCode("FR1"),
        ];
        const pricingRuleBuyOneGetOneFreeFR1 = new PricingRuleBuyOneGetOneFree({
            promoName: "buy-one-get-one-free of fruit tea",
            itemProductCode: "FR1",
        });

        expect(new PricingRuleBuyOneGetOneFree() instanceof PricingRule).toBe(true);

        expect(pricingRuleBuyOneGetOneFreeFR1.isApplicable(itemArray)).toBe(true);

        const removed = pricingRuleBuyOneGetOneFreeFR1.removeDiscountedItems(itemArray);
        expect(itemArray)
        .toEqual([
            undefined,
            itemInventory.getItemByProductCode("SR1"),
            undefined,
        ]);

        expect(removed)
        .toEqual([
            itemInventory.getItemByProductCode("FR1"),
            itemInventory.getItemByProductCode("FR1"),
        ]);

        expect(pricingRuleBuyOneGetOneFreeFR1.getDiscountTotal(removed))
        .toEqual(itemInventory.getItemByProductCode("FR1").price);
    });
});