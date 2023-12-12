"""create tables

Revision ID: a1666b2ee5be
Revises: 
Create Date: 2023-12-10 11:37:44.578367

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a1666b2ee5be'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():

    op.create_table('uecs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('node_name', sa.String(length=255), nullable=False),
    sa.Column('model_number', sa.String(length=255), nullable=False),
    sa.Column('vender_name', sa.String(length=255), nullable=False),
    sa.Column('uecs_id', sa.String(length=255), nullable=False),
    sa.Column('mac_address', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    op.create_table('parameters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('uecs_id', sa.Integer(), nullable=True),
    sa.Column('type', sa.String(length=255), nullable=True),
    sa.Column('room', sa.Integer(), nullable=True),
    sa.Column('region', sa.Integer(), nullable=True),
    sa.Column('order', sa.Integer(), nullable=True),
    sa.Column('priority', sa.Integer(), nullable=True),
    sa.Column('data', sa.Integer(), nullable=True),
    sa.Column('unit', sa.Integer(), nullable=True),
    sa.Column('start', sa.Time(), nullable=True),
    sa.Column('end', sa.Time(), nullable=True),
    sa.Column('duration', sa.Interval(), nullable=True), 
    sa.Column('interval', sa.Interval(), nullable=True),
    sa.Column('ipaddress', sa.String(length=255), nullable=True),    
    sa.ForeignKeyConstraint(['uecs_id'], ['uecs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    
def downgrade():
    op.drop_table('parameters')
    op.drop_table('uecs')


