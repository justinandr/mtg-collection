from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

class Player(db.Model, SerializerMixin):
    __tablename__ = 'players'

    serialize_rules = ('-registrations.players', '-ownerships.card')

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    tournaments_played = db.Column(db.Integer)

    registrations = db.relationship('Registration', back_populates = 'players', cascade = 'all, delete-orphan')
    ownerships = db.relationship('Ownership', back_populates = 'players', cascade = 'all, delete-orphan')

    cards = association_proxy('ownerships', 'card', creator = lambda card_obj: Ownership(card = card_obj))

    @validates('name')
    def validate_name(self, key, name):
        if len(name) > 40:
            raise ValueError("Name cannot be longer than 40 characters")
        return name

    def __repr__(self):
        return f'Player Name: {self.name}'
    
class Card(db.Model, SerializerMixin):
    __tablename__ = 'cards'

    serialize_rules = ('-ownerships.cards', '-players')

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    type = db.Column(db.String, nullable = False)
    rarity = db.Column(db.String, nullable = False)
    set = db.Column(db.String, nullable = False)
    set_name = db.Column(db.String, nullable = False)
    multiverse_id = db.Column(db.Integer)
    image_url = db.Column(db.String)

    ownerships = db.relationship('Ownership', back_populates = 'cards')

    def __repr__(self):
        return f'<Card> Name: {self.name}, Type: {self.type}, Rarity: {self.rarity}, Set Name: {self.set_name}, Multiverse ID: {self.multiverse_id}'
    
class Ownership(db.Model, SerializerMixin):
    __tablename__ = 'ownerships'

    serialize_rules = ('-players', '-cards.ownerships')

    id = db.Column(db.Integer, primary_key = True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'), nullable = False)
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'), nullable = False)

    players = db.relationship('Player', back_populates = 'ownerships')
    cards = db.relationship('Card', back_populates = 'ownerships')

    @validates('player_id')
    def validate_player_id(self, key, id):
        if not isinstance(id, int):
            raise ValueError('player_id must be an integer')
        return id
    
    @validates('card_id')
    def validate_card_id(self, key, id):
        if not isinstance(id, int):
            raise ValueError('card_id must be an integer')
        return id

    def __repr__(self):
        return f'<Ownership> Player ID: {self.player_id}, Card ID: {self.card_id}'
    
class Tournament(db.Model, SerializerMixin):
    __tablename__ = 'tournaments'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    date = db.Column(db.DateTime, nullable = False)
    location = db.Column(db.String, nullable = False)

    @validates('name')
    def validate_name(self, key, name):
        if len(name) > 40:
            raise ValueError("Name cannot be longer than 40 characters")
        return name

    def __repr__(self):
        return f'<Tournament> Name: {self.name}, Date: {self.date}, Location: {self.location}'
    
class Registration(db.Model, SerializerMixin):
    __tablename__ = 'registrations'

    serialize_rules = ('-players.registrations', '-tournaments.registrations')

    id = db.Column(db.Integer, primary_key = True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'), nullable = False)
    tournament_id = db.Column(db.Integer, db.ForeignKey('tournaments.id'), nullable = False)

    players = db.relationship('Player', back_populates = 'registrations')

    @validates('player_id')
    def validate_player_id(self, key, id):
        if not isinstance(id, int):
            raise ValueError('player_id must be an integer')
        return id
    
    @validates('tournament_id')
    def validate_tournament_id(self, key, id):
        if not isinstance(id, int):
            raise ValueError('tournament_id must be an integer')
        return id

    def __repr__(self):
        return f'<Registration> Player ID: {self.player_id}, Tournament ID: {self.tournament_id}'