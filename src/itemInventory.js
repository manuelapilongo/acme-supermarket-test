
const Item = require("./item.js");

/**
 * Simple utility to fetch items from the given json file
 */
function ItemInventory(inventoryDataArray) {
    this.getInventoryDataArray = (() =>
        (Array.isArray(inventoryDataArray) && inventoryDataArray) || []
    );

    this.getItemByProductCode = (productCode) => {
        const matchingItemData = this.getInventoryDataArray()
            .filter(itemEntry => itemEntry.productCode === productCode);
        let item;
        if (matchingItemData.length > 0) {
            item = new Item(matchingItemData[0]);
        }
        return item;
    };
}

module.exports = ItemInventory;
