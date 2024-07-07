"""add models outline

Revision ID: 2891898e7f6a
Revises: 82ccc8d103bc
Create Date: 2024-07-07 12:40:22.978556

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2891898e7f6a'
down_revision = '82ccc8d103bc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('rarity', sa.String(), nullable=False),
    sa.Column('set', sa.String(), nullable=False),
    sa.Column('set_name', sa.String(), nullable=False),
    sa.Column('multiverse_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('players',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('tournaments_played', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tournaments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ownerships',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('player_id', sa.Integer(), nullable=False),
    sa.Column('card_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['card_id'], ['cards.id'], name=op.f('fk_ownerships_card_id_cards')),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], name=op.f('fk_ownerships_player_id_players')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('registrations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('player_id', sa.Integer(), nullable=False),
    sa.Column('tournament_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], name=op.f('fk_registrations_player_id_players')),
    sa.ForeignKeyConstraint(['tournament_id'], ['tournaments.id'], name=op.f('fk_registrations_tournament_id_tournaments')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('registrations')
    op.drop_table('ownerships')
    op.drop_table('tournaments')
    op.drop_table('players')
    op.drop_table('cards')
    # ### end Alembic commands ###
