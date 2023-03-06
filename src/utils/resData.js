module.exports.filterData = (obj) => {
    delete obj["password"];
    delete obj["createdAt"];
    delete obj["updatedAt"];
}