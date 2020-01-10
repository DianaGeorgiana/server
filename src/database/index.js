const Database = require('./Database');

module.exports = new Database();
/*
users { id, name ( uniq ), email ( uniq ), password }

games { id, name }

score { id, userId, gameId, value }

func:
  users:
    - Get all users
    - Get user By id ( games, score )
    - Add user ( register/ sign up )

  - games:
    - Add game
    - Get all games
    - Get game by id ( top 10 scores order desc )

  - score:
     - Add score
     - Get score by game id ( pageable default 10/page )
     - Top 10 players / game
     - Get top5 players
 */
