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
            return {"error": f"{exc}"}, 400
        
class PlayersById(Resource):
    def get(self, id):
        player = Player.query.filter_by(id = id).first()

        if player:
            return player.to_dict(), 200
        
        return {"error": "404 Not Found"}, 404 
    
    def patch(self, id):
        player = Player.query.filter_by(id = id).first()
        data = request.get_json()

        if player:
            for attr in data:
                setattr(player, attr, data[attr])

            db.session.add(player)
            db.session.commit()

            return make_response(player.to_dict(), 200)
        
        return {"error": "404 Not Found"}, 404
    
    def delete(self, id):
        player = Player.query.filter_by(id = id)

        if player:
            db.session.delete(player)
            db.session.commitj()

            return make_response('', 204)
        
        return {"error": "404 Not Found"}, 404
    
class CardsById(Resource):
    def get(self, id):
        card = Card.query.filter_by(id = id).first()

        if card:
            return card.to_dict(), 200
        
        return {"error": "404 Not Found"}, 404
    
class Ownerships(Resource):
    def get(self):
        ownerships = Ownership.query.all()

        if ownerships:
            ownerships_response = [ownership.to_dict() for ownership in ownerships]

            return ownerships_response, 200
        
        return {"error": "404 Not Found"}, 404
    
    def post(self):
        data = request.get_json()

        try:
            new_ownership = Ownership(
                player_id = data['player_id'],
                card_id = data['card_id']
            )

            db.session.add(new_ownership)
            db.session.commit()
            
            return make_response(new_ownership.to_dict(), 201)
        except Exception as exc:
            return {"error": f"{exc}"}, 400
    
class OwnershipsById(Resource):
    def delete(self, id):
        ownership = Ownership.query.filter_by(id = id).first()

        if ownership:
            db.session.delete(ownership)
            db.session.commit()

            return make_response('', 204)
        
        return {"error": "404 Not Found"}, 404

if __name__ == '__main__':
    app.run(port=5555, debug=True)
