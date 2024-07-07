#!/usr/bin/env python3

from flask import request, make_response
from flask_restful import Resource
from config import app, db, api
from models import *

class Home(Resource):
    def get(self):
        return '<h1>MTG Collections</h1>'
    
class Players(Resource):
    def get(self):
        players = Player.query.all()

        if players:
            players_response = [player.to_dict() for player in players]
            return players_response, 200
        
        return {"error": "404 Not Found"}, 404 
    
    def post(self):
        data = request.get_json()

        try:
            new_player = Player(
                name = data['name'],
                tournaments_played = data['tournaments_played']
            )

            db.session.add(new_player)
            db.session.commit()

            return make_response(new_player.to_dict(), 201)
        except Exception as exc:
            return {"error": f"{exc}"}

if __name__ == '__main__':
    app.run(port=5555, debug=True)
