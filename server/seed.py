#!/usr/bin/env python3
from random import randint, choice as rc
from faker import Faker
from app import app
from models import db

fake = Faker()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")