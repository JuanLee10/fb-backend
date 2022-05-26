
-- Your database schema goes here --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

DROP TABLE IF EXISTS person;

CREATE TABLE person(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), info jsonb);

DROP TABLE IF EXISTS category;

CREATE TABLE category(categoryName VARCHAR, filters jsonb, subcategories VARCHAR []);

DROP TABLE IF EXISTS listing;

CREATE TABLE listing(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), creationTime TIMESTAMP WITH TIME ZONE, content jsonb, replies VARCHAR, subcategories VARCHAR[]);

DROP TABLE IF EXISTS replies;

CREATE TABLE replies(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), ListingId UUID, PersonId UUID, reply VARCHAR);
