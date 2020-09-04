-- Post
INSERT INTO projects (
    id,
    name,
    date,
    summary,
    description,
    link,
    imgLink
) VALUES (
    '0',
    'Circle Test',
    '2020-01-01',
    'Example project for circle test,
    this should be deleted by the end.',
    'asdhfkljashdfkjhasdklfhkalsdhfkjhasdkfjhaskldjhfkjasdhfkahsdfkjhasdlkfhkaljsdhfkashdfjkhasdlkfjhaklsdjhfkjashdfkjhasdkljfhlaksjdhfkjashdfkjhasdkjfhaksljdhflkjasdhfkljashdfkjhasdkjlfhaskljdf',
    'example link',
    'example image link'
);
-- Get
SELECT * FROM projects WHERE id = 0;
-- Put
DELETE FROM projects WHERE id = 0;
INSERT INTO projects (
    id,
    name,
    date,
    summary,
    description,
    link,
    imgLink
) VALUES (
    '0',
    'Circle Test',
    '2020-01-01',
    'Example project for circle test,
    this should be deleted by the end.',
    'asdhfkljashdfkjhasdklfhkalsdhfkjhasdkfjhaskldjhfkjasdhfkahsdfkjhasdlkfhkaljsdhfkashdfjkhasdlkfjhaklsdjhfkjashdfkjhasdkljfhlaksjdhfkjashdfkjhasdkjfhaksljdhflkjasdhfkljashdfkjhasdkjlfhaskljdf',
    'example link',
    'example image link'
);
-- Delete
DELETE FROM projects WHERE id = 0;
