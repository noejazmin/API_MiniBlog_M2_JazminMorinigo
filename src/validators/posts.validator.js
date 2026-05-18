const validatePostData = ({ title, content, author_id }) => {
    if (!title || !content || !author_id) {
        return "Title, content y author_id son obligatorios";
    }

    if (isNaN(Number(author_id))) {
        return "El author_id debe ser un numero";
    }

    return null;
};

module.exports = {
    validatePostData,
};
