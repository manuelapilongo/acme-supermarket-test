
describe('item', () => {
    const Item = require("../item.js");
    const BigNumber = require("bignumber.js");
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

    it('Handle wrong input data', () => {
        expect(() => {
            new Item();
        }).toThrow();

        expect(() => {
            new Item({
                productCode: "CF1",
                name: "Fruit tea",
                price: -0.1
            });
        }).toThrow();

        expect(() => {
            new Item({
                productCode: "CF1",
                name: "Fruit tea",
                price: 0 / 0
            });
        }).toThrow();

        expect(() => {
            new Item({
                productCode: 1,
                name: "Fruit tea",
                price: 1
            });
        }).toThrow();
    });

    it('Handle correct input data', () => {
        const item = new Item({
            productCode: "CF1",
            name: "Fruit tea",
            price: 11.23
        });
        expect(item).toHaveProperty("productCode", ItemInventoryData[2].productCode)
        expect(item).toHaveProperty("name", ItemInventoryData[2].name)
        expect(item).toHaveProperty("price", new BigNumber(ItemInventoryData[2].price));
    });
});