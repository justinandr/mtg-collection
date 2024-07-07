from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Player(db.Model, SerializerMixin):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    tournaments_played = db.Column(db.Integer)

    def __repr__(self):
        return f'Player Name: {self.name}'
    
class Card(db.Model, SerializerMixin):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    type = db.Column(db.String, nullable = False)
    rarity = db.Column(db.String, nullable = False)
    set = db.Column(db.String, nullable = False)
    set_name = db.Column(db.String, nullable = False)
    multiverse_id = db.Column(db.Integer, nullable = False)
    image_url = db.Column(db.String, nullable = False)

    def __repr__(self):
        return f'<Card> Name: {self.name}, Type: {self.type}, Rarity: {self.rarity}, Set Name: {self.set_name}, Multiverse ID: {self.multiverse_id}'
    
class Ownership(db.Model, SerializerMixin):
    __tablename__ = 'ownerships'

    id = db.Column(db.Integer, primary_key = True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'), nullable = False)
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'), nullable = False)

    def __repr__(self):
        return f'<Ownership> Player ID: {self.player_id}, Card ID: {self.card_id}'
    
class Tournament(db.Model, SerializerMixin):
    __tablename__ = 'tournaments'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    date = db.Column(db.DateTime, nullable = False)
    location = db.Column(db.String, nullable = False)

    def __repr__(self):
        return f'<Tournament> Name: {self.name}, Date: {self.date}, Location: {self.location}'
    
class Registration(db.Model, SerializerMixin):
    __tablename__ = 'registrations'

    id = db.Column(db.Integer, primary_key = True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'), nullable = False)
    tournament_id = db.Column(db.Integer, db.ForeignKey('tournaments.id'), nullable = False)

    def __repr__(self):
        return f'<Registration> Player ID: {self.player_id}, Tournament ID: {self.tournament_id}'