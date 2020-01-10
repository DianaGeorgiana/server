-- https://www.db-fiddle.com/

CREATE TABLE note (
  id integer primary key autoincrement,
  title varchar(50) not null,
  content text
);

CREATE TABLE users (
  id integer primary key autoincrement ,
  name varchar(50) not null unique,
  email varchar(60) not null unique,
  password varchar(60) not null
);

CREATE TABLE games (
  id integer primary key autoincrement,
  name varchar(50) not null
);

CREATE TABLE score (
  id integer primary key autoincrement,
  userId integer not null,
  gameId integer not null,
  val integer,
  FOREIGN KEY(userId) REFERENCES users(id),
  FOREIGN KEY(gameId) REFERENCES games(id)
);

INSERT INTO users (id, name, email, password) values (1, "Ana", "ana@gmail.com", "1234");
INSERT INTO users (id, name, email, password) values (2,"John", "John@gmail.com", "1234");
INSERT INTO users (id, name, email, password) values (3,"Johny", "Johny@gmail.com", "1234");
INSERT INTO users (id, name, email, password) values (4,"ari", "ari@gmail.com", "1234");

INSERT INTO games(id, name) values (1,"battleship");
INSERT INTO games(id, name) values (2,"connect_four");
INSERT INTO games(id, name) values (3,"tic tac toe");
INSERT INTO games(id, name) values (4,"hangman");

INSERT INTO score(id, userId, gameId, val) values (1,1,1,10);
INSERT INTO score(id, userId, gameId, val) values (9,1,1,30);
 INSERT INTO score(id, userId, gameId, val) values(2,2,1,17);
  INSERT INTO score(id, userId, gameId, val) values (3,3,1,7);
   INSERT INTO score(id, userId, gameId, val) values (4,4,1,19);
      INSERT INTO score(id, userId, gameId, val) values (10,4,1,31);

   INSERT INTO score(id, userId, gameId, val) values (5,1,2,16);
      INSERT INTO score(id, userId, gameId, val) values (6,1,3,20);
         INSERT INTO score(id, userId, gameId, val) values (7,3,2,23);
                 INSERT INTO score(id, userId, gameId, val) values (8,4,4,23);



INSERT INTO note (title,content) VALUES ('note title 1', 'note content 1');
INSERT INTO note (title,content) VALUES ('note title 2', 'note content 2');
INSERT INTO note (id,title,content) VALUES (5,'note title 3', 'note content 3');
INSERT INTO note (title,content) VALUES ('note title 4', 'note content 4');
INSERT INTO note (title,content) VALUES ('note title 5', 'note content 5');
