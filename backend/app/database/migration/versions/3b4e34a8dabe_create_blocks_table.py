"""Create blocks table

Revision ID: 3b4e34a8dabe
Revises: c00d0abb72ea
Create Date: 2024-01-25 04:47:22.856434

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3b4e34a8dabe'
down_revision: Union[str, None] = 'c00d0abb72ea'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass
    # op.create_table(
    # 'blocks',
    # sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
    # sa.Column('block_a_id', sa.Integer(), sa.ForeignKey('block_a.uecsid')),
    # sa.Column('valid', sa.SmallInteger()),
    # sa.Column('room', sa.SmallInteger()),        
    # sa.Column('region', sa.LargeBinary()),
    # sa.Column('order', sa.Integer()),    
    # sa.Column('priority', sa.SmallInteger()),
    # sa.Column('lv', sa.Integer()),
    # sa.Column('cast', sa.SmallInteger()),
    # sa.Column('sr', sa.String(length=50)),  # 長さを指定
    # sa.Column('ccm_type', sa.String(length=20)),
    # sa.Column('unit', sa.String(length=10)),
    # sa.Column('sthr', sa.Integer()),
    # sa.Column('stmn', sa.Integer()),
    # sa.Column('edhr', sa.Integer()),
    # sa.Column('edmn', sa.Integer()),
    # sa.Column('inmn', sa.Integer()),
    # sa.Column('dumn', sa.Integer()),
    # sa.Column('rly_l', sa.SmallInteger()),
    # sa.Column('rly_h', sa.SmallInteger()),
    # mysql_engine='InnoDB'
    # )


def downgrade() -> None:
    pass
    # op.drop_table('blocks')
