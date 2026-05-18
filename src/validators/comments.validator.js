const validateCommentData = ({ content, post_id, author_id }) => {
    if (!content || !post_id || !author_id) {
        return "Content, post_id y author_id son obligatorios";
    }

    if (isNaN(Number(post_id))) {
        return "El post_id debe ser un numero";
    }

    if (isNaN(Number(author_id))) {
        return "El author_id debe ser un numero";
    }

    return null;
};

module.exports = {
    validateCommentData,
};
