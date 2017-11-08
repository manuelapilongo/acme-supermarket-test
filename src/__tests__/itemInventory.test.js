
describe('itemInventory', () => {
    const ItemInventory = require("../itemInventory.js");
    const Item = require("../item.js");

    const ItemInventoryData = [{
        productCode: "FR1",
        name: "Fruit tea",
        price: 3.11
    },
    {
        productCode: "SR1",
        name: "Fruit tea",
        price: 5.00
    },
    {
        productCode: "CF1",
        name: "Fruit tea",
        price: 11.23
    }];

    it('Initialize correctly', () => {
        expect(new ItemInventory().getInventoryDataArray().length).toBe(0);

        expect(new ItemInventory("").getInventoryDataArray().length).toBe(0);

        expect(new ItemInventory(ItemInventoryData).getInventoryDataArray().length).toBe(3);
    });

    it('Search items from the dataset', () => {
        expect(new ItemInventory().getInventoryDataArray().length).toBe(0);

        expect(new ItemInventory("").getInventoryDataArray().length).toBe(0);

        expect(new ItemInventory(ItemInventoryData).getItemByProductCode("CF1"))
        .toEqual(new Item({
            productCode: "CF1",
            name: "Fruit tea",
            price: 11.23
        }));
    });
});