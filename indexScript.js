let apiKey = "f086738a-86f8-4b62-8b0d-c1b997a02fbf";
let xhr = new XMLHttpRequest();

function getAllCrypto() {
    xhr.open("GET", "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=USD&CMC_PRO_API_KEY=f086738a-86f8-4b62-8b0d-c1b997a02fbf");
    xhr.onreadystatechange = setSelectOptions;
    xhr.send();

}

function setSelectOptions() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let cryptoData = JSON.parse(xhr.responseText);
        cryptoData = cryptoData["data"];

        document.getElementById("all-crypto").innerHTML = getSelectOptions(cryptoData);
    }
}

function getCryptoInfoReq() {
    xhr.open("GET", "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=USD&CMC_PRO_API_KEY=f086738a-86f8-4b62-8b0d-c1b997a02fbf");
    xhr.onreadystatechange = getCryptoInfo;
    xhr.send();
}

function getCryptoInfo() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let crypto = document.getElementById("all-crypto").value;

        let cryptoData = JSON.parse(xhr.responseText);
        cryptoData = cryptoData["data"];

        let resHtml = "";

        cryptoData.forEach(el => {

            if (el.name === crypto) {
                getCryptoLogoAndWebsite(el.id);
                resHtml += "<tr><td> Percent change per 24h: </td><td>" + el.quote.USD.percent_change_24h + "</td></tr>";
                resHtml += "<tr><td> Price: </td><td>" + el.quote.USD.price + "</td></tr>";
            }
        })
        document.getElementById("crypto-info").innerHTML = resHtml;
    }
}
function getCryptoLogoAndWebsite(id) {
    xhr.open("GET", "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=" + id + "&CMC_PRO_API_KEY=f086738a-86f8-4b62-8b0d-c1b997a02fbf");
    xhr.onreadystatechange = returnData;
    xhr.send();
}
function returnData() {
    let resHtml = "";

    if (xhr.readyState === 4 && xhr.status === 200) {
        let cryptoData = JSON.parse(xhr.responseText);
        cryptoData = cryptoData["data"];
        for (let key in cryptoData) {
            resHtml += "<tr><td> Website: </td><td>" + cryptoData[key].urls.website[0] + "</td></tr>";
            resHtml += "<tr><td> Logo link: </td><td>" + cryptoData[key].logo + "</td></tr>";
            resHtml += "<tr><td> Description: </td><td>" + cryptoData[key].description + "</td></tr>";
        }
        document.getElementById("crypto-info2").innerHTML = resHtml;
    }
}
function getSelectOptions(cryptoData) {
    let resHtml = '';

    cryptoData.forEach(el => {
        resHtml += "<option value = '" + el.name + "'>" + el.name + "</option>";
    });
    return resHtml;
}