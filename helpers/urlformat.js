function urlFormat (input){
    let url = encodeURIComponent(input);
    return url;
}

module.exports = urlFormat;