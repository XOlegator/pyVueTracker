"""empty message

Revision ID: 44a23a423986
Revises: e6406dfd09ac
Create Date: 2019-01-10 18:06:45.396364

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '44a23a423986'
down_revision = 'e6406dfd09ac'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tracker_projects', sa.Column('user_id', sa.Integer(), nullable=True))
    op.drop_constraint('tracker_projects_ibfk_3', 'tracker_projects', type_='foreignkey')
    op.create_foreign_key(None, 'tracker_projects', 'users', ['user_id'], ['id'])
    op.drop_column('tracker_projects', 'userid')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tracker_projects', sa.Column('userid', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'tracker_projects', type_='foreignkey')
    op.create_foreign_key('tracker_projects_ibfk_3', 'tracker_projects', 'users', ['userid'], ['id'])
    op.drop_column('tracker_projects', 'user_id')
    # ### end Alembic commands ###
