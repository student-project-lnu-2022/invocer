export class Item {
    constructor(json, requestedJson) {
        this.id = json['id'];
        this.title = json['name'];
        this.basicUnit = json['basic_unit'];
        this.price = json['price'];
        this.currency = json['currency'];
        this.barcode = json['barcode'];
        this.inStock = json['amount_in_stock'];
        this.additionalUnits = new Object;
        for (let unit of requestedJson) {
            this.additionalUnits[unit['additional_unit_name']] = unit['quantity'];
        }
    }
}