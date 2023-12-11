"""Manual migration

Revision ID: 6670b3fae335
Revises: e0e22839d383
Create Date: 2023-12-11 16:33:21.862941

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6670b3fae335'
down_revision = 'e0e22839d383'
branch_labels = None
depends_on = None


def upgrade():

    op.create_table('article',
    sa.Column('citekey', sa.String(), nullable=False),
    sa.Column('author', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('year', sa.String(), nullable=False),
    sa.Column('journal', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('citekey')
    )
    op.create_table('book',
    sa.Column('citekey', sa.String(), nullable=False),
    sa.Column('author', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('year', sa.String(), nullable=False),
    sa.Column('publisher', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('citekey')
    )
    op.create_table('inproceedings',
    sa.Column('citekey', sa.String(), nullable=False),
    sa.Column('author', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('year', sa.String(), nullable=False),
    sa.Column('book_title', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('citekey')
    )


def downgrade():
    op.drop_table('book')
    op.drop_table('inproceedings')
    
