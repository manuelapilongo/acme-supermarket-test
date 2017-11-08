
const BigNumber = require("bignumber.js");
const PricingRule = require("./pricingRule.js");
const Item = require("./item.js");

function PricingRuleBulkPurchasesPriceDrop(spec) {
    const localSpec = spec || {};
    PricingRule.call(this, spec);
    this.amount = (localSpec.amount && new BigNumber(localSpec.amount)) || undefined;
    this.promoItemPrice =
        (localSpec.promoItemPrice && new BigNumber(localSpec.promoItemPrice)) || undefined;
}

PricingRuleBulkPurchasesPriceDrop.prototype = Object.create(PricingRule.prototype);

PricingRuleBulkPurchasesPriceDrop.prototype.constructor = PricingRuleBulkPurchasesPriceDrop;

function isApplicable(items) {
    const totalMatching = items
        .filter(item => item instanceof Item)
        .filter(item => item.productCode === this.itemProductCode, this)
        .length;
    return new BigNumber(totalMatching).greaterThanOrEqualTo(this.amount);
}

function removeDiscountedItems(items) {
    const itemsOnDiscount = items.filter(item => item instanceof Item)
        .map((item, index) => {
            if (item.productCode === this.itemProductCode) {
                items[index] = undefined; // remove from original
                return item;
            }
            return undefined;
        }, this)
        .filter(item => item instanceof Item);

    return itemsOnDiscount;
}

function getDiscountTotal(items) {
    return items.filter(item => item.productCode === this.itemProductCode, this)
        .map(item => item.price.minus(this.promoItemPrice), this)
        .reduce((acc, curr) => acc.plus(curr), new BigNumber(0.0))
        .round(2, BigNumber.ROUND_HALF_EVEN);
}

PricingRuleBulkPurchasesPriceDrop.prototype.isApplicable = isApplicable;
PricingRuleBulkPurchasesPriceDrop.prototype.removeDiscountedItems = removeDiscountedItems;
PricingRuleBulkPurchasesPriceDrop.prototype.getDiscountTotal = getDiscountTotal;


module.exports = PricingRuleBulkPurchasesPriceDrop;
