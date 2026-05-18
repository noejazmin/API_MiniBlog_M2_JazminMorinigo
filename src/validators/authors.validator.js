const validateAuthorData = ({ name, email }) => {
    if (!name || !email) {
        return "Name y email son obligatorios";
    }

    return null;
};

module.exports = {
    validateAuthorData,
};
