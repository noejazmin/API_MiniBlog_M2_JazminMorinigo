const pool = require("../db/pool");

const getAllComments = async () => {
    const result = await pool.query(
        `SELECT 
            comments.id,
            comments.content,
            comments.created_at,
            comments.post_id,
            posts.title AS post_title,
            comments.author_id,
            authors.name AS author_name,
            authors.email AS author_email
        FROM comments
        JOIN posts ON comments.post_id = posts.id
        JOIN authors ON comments.author_id = authors.id
        ORDER BY comments.id ASC`
    );

    return result.rows;
};

const getCommentsByPostId = async (postId) => {
    const result = await pool.query(
        `SELECT 
            comments.id,
            comments.content,
            comments.created_at,
            comments.post_id,
            posts.title AS post_title,
            comments.author_id,
            authors.name AS author_name,
            authors.email AS author_email
        FROM comments
        JOIN posts ON comments.post_id = posts.id
        JOIN authors ON comments.author_id = authors.id
        WHERE comments.post_id = $1
        ORDER BY comments.id ASC`,
        [postId]
    );

    return result.rows;
};

const createComment = async ({ content, post_id, author_id }) => {
    const result = await pool.query(
        "INSERT INTO comments (content, post_id, author_id) VALUES ($1, $2, $3) RETURNING *",
        [content, post_id, author_id]
    );

    return result.rows[0];
};

module.exports = {
    getAllComments,
    getCommentsByPostId,
    createComment,
};
