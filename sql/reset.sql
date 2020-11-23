-- ---------------------------------------------------------------------
-- Delete tables, might throw errors if they don't exist but that's okay
-- ---------------------------------------------------------------------
DROP TABLE projects;
DROP TABLE jobs;
DROP TABLE education;
DROP TABLE skills;
DROP TABLE accounts;
-- ---------------------------------------------------------------------
-- Create tables, we know they don't exist
-- ---------------------------------------------------------------------
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    page varchar(1000) NOT NULL);
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    account_id integer NOT NULL,
    name varchar(1000) NOT NULL,
    date date NOT NULL,
    summary varchar(2000) NOT NULL,
    description text,
    link varchar(1000),
    imgLink varchar(1000),
    CONSTRAINT fk FOREIGN KEY(account_id) REFERENCES accounts(id));
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    account_id integer NOT NULL,
    title varchar(1000) NOT NULL,
    employer varchar(200) NOT NULL,
    startDate date NOT NULL,
    endDate date,
    description varchar(2000),
    CONSTRAINT fk FOREIGN KEY(account_id) REFERENCES accounts(id));
CREATE TABLE educations (
    id SERIAL PRIMARY KEY,
    account_id integer NOT NULL,
    school varchar(200) NOT NULL,
    type varchar(200) NOT NULL,
    field varchar(200) NOT NULL,
    startDate date NOT NULL,
    endDate date,
    description varchar(2000),
    CONSTRAINT fk FOREIGN KEY(account_id) REFERENCES accounts(id));
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    account_id integer NOT NULL,
    description VARCHAR(1000) NOT NULL,
    CONSTRAINT fk FOREIGN KEY(account_id) REFERENCES accounts(id));
-- ---------------------------------------------------------------------
-- Insert rows, we need some dummy data
-- ---------------------------------------------------------------------
-- Accounts
INSERT INTO accounts(page) VALUES('test');
INSERT INTO accounts(page) VALUES('another');
-- Projects
INSERT INTO projects(account_id, name, date, summary) VALUES('1', 'Example Project', '2001-09-28', 'This project was dope');
INSERT INTO projects(account_id, name, date, summary, description, link, imgLink) 
VALUES('1', 'Example Project', '2001-09-28', 'This project was dope', 'test test blah blah asdhflahsdglkasdlkgasdjkglkasdhgkasdjadgahdgaldglajadhgkjlalsdg', 'link', 'imageLink');
INSERT INTO projects(account_id, name, date, summary, description, link, imgLink) 
VALUES('1', 'Example Project 2', '2001-09-28', 'This other roject was dope', 'test test blah blah asdhflahsdglkasdlkgasdjkglkasdhgkasdjadgahdgaldglajadhgkjlalsdg', 'link', 'imageLink');
-- Jobs
INSERT INTO jobs(account_id, title, employer, startDate, endDate, description)
VALUES('1', 'Junior Engineer 5', 'Google', '2008-05-19', '2018-07-23', 'Worked on senior engineer stuff that was super cool and things like that.');
INSERT INTO jobs(account_id, title, employer, startDate, endDate, description)
VALUES('1', 'Engineer 6', 'Google', '2008-05-19', '2018-07-23', 'Worked on senior engineer stuff that was super cool and things like that.');
INSERT INTO jobs(account_id, title, employer, startDate, description)
VALUES('1', 'Senior Engineer 7', 'Google', '2019-01-13', 'Worked on senior engineer stuff that was super cool and things like that.');
-- Education
INSERT INTO educations(account_id, school, type, field, startDate, endDate, description)
VALUES('1', 'SSU', 'Batchlors', 'Mechanical Engineering', '1821-04-06', '1825-04-05', 'Emphasis on calculus and stuff');
INSERT INTO educations(account_id, school, type, field, startDate, description)
VALUES('1', 'MIT', 'Masters', 'Particle Physics', '1825-04-06', 'Emphasis on thermodynamics');
-- Skills
INSERT INTO skills(account_id, description) VALUES('1','Node');
INSERT INTO skills(account_id, description) VALUES('1','C#');
INSERT INTO skills(account_id, description) VALUES('1','AutoCAD');
INSERT INTO skills(account_id, description) VALUES('1','Excel');