#!/usr/bin/env python3

from flask import request, make_response
from flask_restful import Resource
from config import app, db, api
from models import *
from datetime import date

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
    
class CardSearch(Resource):
    def post(self):
        data = request.get_json()
        
        if data['name'] and data['rarity']:
            cards = Card.query.filter_by(name = data['name']).filter_by(rarity = data['rarity']).all()
        elif data['name'] and not data['rarity']:
            cards = Card.query.filter_by(name = data['name']).all()
        elif not data['name'] and data['rarity']:
            cards = Card.query.filter_by(rarity = data['rarity'])
        if cards:
            card_response = [card.to_dict() for card in cards]
            
            return card_response, 200
        
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
    
class Tournaments(Resource):
    def get(self):
        tournaments = Tournament.query.all()

        if tournaments:
            tournaments_response = [tournament.to_dict() for tournament in tournaments]
            return tournaments_response, 200
        
        return {"error": "404 Not Found"}, 404
    
    def post(self):
        data = request.get_json()

        try:
            new_tournament = Tournament(
                name = data['name'],
                date = date(data['year'], data['month'], data['day']),
                location = data['location']
            )

            db.session.add(new_tournament)
            db.session.commit()

            return make_response(new_tournament.to_dict(), 201)
        except Exception as exc:
            return {"error": f"{exc}"}, 400
        
class TournamentsById(Resource):
    def delete(self, id):
        tournament = Tournament.query.filter_by(id = id).first()

        if tournament:
            db.session.delete(tournament)
            db.session.commit()

            return make_response('', 204)
    def patch(self, id):
        tournament = Tournament.query.filter_by(id = id).first()
        data = request.get_json()

        if tournament:
            if data['name']:
                tournament.name = data['name']
            if data['year']:
                tournament.date = date(data['year'], data['month'], data['day'])
            if data['location']:
                tournament.location = data['location']
            
            db.session.add(tournament)
            db.session.commit()

            return make_response(tournament.to_dict(), 200)
        
        return {"error": "404 Not Found"}, 404

class Registrations(Resource):
    def get(self):
        registrations = Registration.query.all()

        if registrations:
            registrations_response = [registration.to_dict(rules = ('-players',)) for registration in registrations]

            return registrations_response, 200
        
        return {"error": "404 Not Found"}, 404
    
    def post(self):
        data = request.get_json()

        try:
            new_registration = Registration(
                player_id = int(data['player_id']),
                tournament_id = data['tournament_id']
            )

            db.session.add(new_registration)
            db.session.commit()
        except Exception as exc:
            return {"error": f"{exc}"}, 400
        
class RegistrationsById(Resource):
    def delete(self, id):
        registration = Registration.query.filter_by(id = id).first()

        if registration:
            db.session.delete(registration)
            db.session.commit()

            return make_response('', 204)
        
        return {"error": "404 Not Found"}, 404
    
api.add_resource(Home, '/')
api.add_resource(Players, '/players')
api.add_resource(PlayersById, '/players/<int:id>')
api.add_resource(CardsById, '/cards/<int:id>')
api.add_resource(CardSearch, '/cards/search')
api.add_resource(Ownerships, '/ownerships')
api.add_resource(OwnershipsById, '/ownerships/<int:id>')
api.add_resource(Tournaments, '/tournaments')
api.add_resource(TournamentsById, '/tournaments/<int:id>')
api.add_resource(Registrations, '/registrations')
api.add_resource(RegistrationsById, '/registrations/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)