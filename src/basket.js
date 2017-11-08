
// const InvoiceView = require("./invoiceView.js");

const Item = require("./item.js");
const PricingRule = require("./pricingRule.js");
const BigNumber = require("bignumber.js");

function Basket(pricingRules) {
    this.pricingRules = pricingRules;
    this.items = [];

    // example
    // this.view = new InvoiceView();
}

function add(item) {
    this.items.push(new Item(item));
}

function total() {
    const itemsToBeDiscounted = [];
    return this.items.map((item) => {
        itemsToBeDiscounted.push(item);
        // this.InvoiceView.addItem(item);
        return item.price.minus(this.pricingRules
            .filter(pricingRule => pricingRule instanceof PricingRule)
            .map((pricingRule) => {
                let partialDiscount = new BigNumber(0);
                while (pricingRule.isApplicable(itemsToBeDiscounted)) {
                    const itemsMatchingPricingRule =
                        pricingRule.removeDiscountedItems(itemsToBeDiscounted);
                    partialDiscount = partialDiscount
                        .plus(pricingRule.getDiscountTotal(itemsMatchingPricingRule));
                // this.invoiceView
                //   .addDiscountedItems(pricingRule, itemsMatchingDiscount);
                }
                return partialDiscount;
            })
            .reduce((acc, partialDiscount) => acc.plus(partialDiscount), new BigNumber(0.0)));
    }, this)
        .reduce((acc, partialDiscountTotal) => acc.plus(partialDiscountTotal), new BigNumber(0.0))
        .round(2, BigNumber.ROUND_HALF_UP) // HALF_UP for totals
        .toNumber();
}

Basket.prototype.add = add;
Basket.prototype.total = total;

module.exports = Basket;
