const isInvalidId = (id) => {
    return isNaN(Number(id));
};

module.exports = {
    isInvalidId,
};
