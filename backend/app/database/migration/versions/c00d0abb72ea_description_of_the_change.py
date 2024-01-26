"""description of the change

Revision ID: c00d0abb72ea
Revises: b1e844a5576c
Create Date: 2024-01-24 08:56:02.895051

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c00d0abb72ea'
down_revision: Union[str, None] = 'b1e844a5576c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
