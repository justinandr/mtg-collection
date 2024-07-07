#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, Player, Card, Ownership, Tournament, Registration
from datetime import date
from mtgsdk import Card as mtgcard

fake = Faker()

tournament_suffixes = ['Invitational', 
                       'Classic', 
                       'Playoffs', 
                       'Championship', 
                       'Regional', 
                       'National']

def create_players():
    players = []

    for p in range(50):
        player = Player(name = fake.name(), tournaments_played = randint(1, 25))
        players.append(player)

    return players

def create_cards():
    cards = []

    all_cards = mtgcard.all()

    for mtg_card in all_cards:
        if mtg_card.multiverse_id:
            card = Card(
                name = mtg_card.name,
                type = mtg_card.type,
                rarity = mtg_card.rarity,
                set = mtg_card.set,
                set_name = mtg_card.set_name,
                multiverse_id = mtg_card.multiverse_id,
                image_url = mtg_card.image_url
            )
            cards.append(card)
    
    return cards

def create_ownerships():
    ownerships = []

    for p in range(50):
        for c in range(50):
            ownership = Ownership(player_id = p + 1, card_id = randint(1, 1000))
            ownerships.append(ownership)

    return ownerships

def create_tournaments():
    tournaments = []

    for t in range(25):

        year = int(fake.year())
        month = int(fake.month())
        day = int(fake.day_of_month())

        tournament = Tournament(
            name = f'{fake.city()} {rc(tournament_suffixes)}',
            date = date(year, month, day),
            location = fake.address()
        )
        tournaments.append(tournament)

    return tournaments

def create_registrations():
    registrations = []

    for p in range(50):
        for t in range(2):
            registration = Registration(player_id = p + 1, tournament_id = randint(1, 25))
            registrations.append(registration)

    return registrations

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing db")
        Player.query.delete()
        Card.query.delete()
        Ownership.query.delete()
        Tournament.query.delete()
        Registration.query.delete()

        print('Seeding players...')
        players = create_players()
        db.session.add_all(players)
        db.session.commit()

        print('Seeding cards...')
        cards = create_cards()
        db.session.add_all(cards)
        db.session.commit()

        print('Seeding ownerships...')
        ownerships = create_ownerships()
        db.session.add_all(ownerships)
        db.session.commit()

        print('Seeding tournaments...')
        tournaments = create_tournaments()
        db.session.add_all(tournaments)
        db.session.commit()

        print('Seeding registrations...')
        registrations = create_registrations()
        db.session.add_all(registrations)
        db.session.commit()

        print('Database seeded successfully.')