CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	user_name VARCHAR(400) NOT NULL,
	email VARCHAR(300) NOT NULL,
	password_digest VARCHAR(400),
    image_url VARCHAR(600),
	created_at TIMESTAMP   
);

CREATE TABLE questions (
	id SERIAL PRIMARY KEY,
	title VARCHAR(400),	
	description VARCHAR(800),
	created_by INTEGER,
	created_at TIMESTAMP,
	FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE RESTRICT
);

CREATE TABLE answers (
	id SERIAL PRIMARY KEY,
	content VARCHAR(900) NOT NULL,
	question_id INTEGER NOT NULL,
	"like" INTEGER NOT NULL,
    dislike INTEGER NOT NULL,
	created_by INTEGER,
	created_at TIMESTAMP,
	FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE RESTRICT,
	FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE RESTRICT
);

ALTER TABLE users ALTER COLUMN created_at SET DEFAULT now();

ALTER TABLE answers ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE questions ALTER COLUMN created_at SET DEFAULT now();