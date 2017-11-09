
const BigNumber = require("bignumber.js");
const Item = require("./item.js");
const PricingRule = require("./pricingRule.js");

function PricingRuleBuyOneGetOneFree(spec) {
    PricingRule.call(this, spec);
}

PricingRuleBuyOneGetOneFree.prototype = Object.create(PricingRule.prototype);

PricingRuleBuyOneGetOneFree.prototype.constructor = PricingRuleBuyOneGetOneFree;

function isApplicable(items) {
    return items
        .filter(item => item instanceof Item)
        .filter(item => item.productCode === this.itemProductCode, this)
        .length > 1;
}

function removeDiscountedItems(items) {
    const discontedItems = [];
    items
    .filter(item => item instanceof Item)
    .forEach((item, index) => {
        if (discontedItems.length < 2
            && item.productCode === this.itemProductCode) {
            discontedItems.push(item);
            items[index] = undefined;
        }
    });
    return discontedItems;
}

function getDiscountTotal(items) {
    const singleItemPrice = items
        .filter(item => item.productCode === this.itemProductCode, this)
        .map(item => item.price)
        .pop();

    return (singleItemPrice || new BigNumber(0.0))
        .round(2, BigNumber.ROUND_HALF_EVEN);
}

PricingRuleBuyOneGetOneFree.prototype.isApplicable = isApplicable;
PricingRuleBuyOneGetOneFree.prototype.removeDiscountedItems = removeDiscountedItems;
PricingRuleBuyOneGetOneFree.prototype.getDiscountTotal = getDiscountTotal;


module.exports = PricingRuleBuyOneGetOneFree;
