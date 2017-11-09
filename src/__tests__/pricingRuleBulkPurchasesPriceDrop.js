
describe('pricingRuleBulkPurchasesPriceDrop', () => {
    const ItemInventory = require("../itemInventory.js");
    const PricingRuleBulkPurchasesPriceDrop = require("../pricingRuleBulkPurchasesPriceDrop.js");
    const BigNumber = require("bignumber.js");
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
            itemInventory.getItemByProductCode("SR1"),
            itemInventory.getItemByProductCode("SR1"),
            itemInventory.getItemByProductCode("SR1"),
            itemInventory.getItemByProductCode("SR1"),
        ];
        const pricingRuleBulkPurchasesPriceDropSR1 = new PricingRuleBulkPurchasesPriceDrop({
            promoName: "buy 3 or more strawberries, the price should drop to £4.50",
            itemProductCode: "SR1",
            amount: 3,
            promoItemPrice: 4.50,
        });

        expect(new PricingRuleBulkPurchasesPriceDrop() instanceof PricingRule).toBe(true);

        expect(pricingRuleBulkPurchasesPriceDropSR1.isApplicable(itemArray)).toBe(true);

        const removed = pricingRuleBulkPurchasesPriceDropSR1.removeDiscountedItems(itemArray);
        expect(itemArray)
        .toEqual([
            itemInventory.getItemByProductCode("FR1"),
            undefined,
            itemInventory.getItemByProductCode("FR1"),
            undefined,
            undefined,
            undefined,
            undefined,
        ]);

        expect(removed)
        .toEqual([
            itemInventory.getItemByProductCode("SR1"),
            itemInventory.getItemByProductCode("SR1"),
            itemInventory.getItemByProductCode("SR1"),
            itemInventory.getItemByProductCode("SR1"),
            itemInventory.getItemByProductCode("SR1"),
        ]);

        // totalDiscount = (5.0 * 5) - (4.5 * 5)
        expect(pricingRuleBulkPurchasesPriceDropSR1.getDiscountTotal(removed))
        .toEqual(
            new BigNumber(itemInventory.getItemByProductCode("SR1").price)
            .mul(removed.length)
            .minus(new BigNumber(4.50).mul(removed.length))
        );
    });
});