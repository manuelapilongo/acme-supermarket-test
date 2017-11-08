
const BigNumber = require("bignumber.js");

/**
 * Simple utility to fetch items from the given json file
 */
function item(sourceData) {
    this.productCode = sourceData.productCode;
    this.name = sourceData.name;
    this.price = new BigNumber(sourceData.price);

    if (this.productCode === undefined || typeof this.productCode !== "string") {
        throw new Error("Item.productCode string is mandatory");
    }
    if (this.name === undefined || typeof this.name !== "string") {
        throw new Error("Item.name string is mandatory");
    }
    if (this.price.isNaN()
        || !this.price.isFinite(this.price)
        || this.price.lessThanOrEqualTo(0)) {
        throw new Error("Item.price must be numeric > 0 ");
    }
}

module.exports = item;
