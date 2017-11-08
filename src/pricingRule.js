
const BigNumber = require("bignumber.js");

function PricingRule(spec) {
    const localSpec = spec || {};
    this.promoName = localSpec.promoName;
    this.itemProductCode = localSpec.itemProductCode;
}

PricingRule.prototype = {
    isApplicable: (/* items */) => false,
    removeDiscountedItems: (/* items */) => [],
    getDiscountTotal: (/* items */) => new BigNumber(0.0),
};

module.exports = PricingRule;
