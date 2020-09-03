CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name varchar(1000) NOT NULL,
    date date NOT NULL,
    summary varchar(2000) NOT NULL,
    description text,
    link varchar(1000),
    imgLink varchar(1000)
);

-- COPY projects FROM './projects.txt';