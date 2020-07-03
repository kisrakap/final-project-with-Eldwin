function priceSeparator(price){
    let str = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

    return str;
}

module.exports = priceSeparator;