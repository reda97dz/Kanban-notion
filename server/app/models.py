from app import db 

class Board(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    description = db.Column(db.Text)

    def __init__(self, name, description):
        self.name = name
        self.description = description
    
    def serialize(self):
        return {
            'id': self.id, 
            'name': self.name,
            'description': self.description
        }

class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey('board.id'))
    name = db.Column(db.String(255))
    position = db.Column(db.Integer)

class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'))
    name = db.Column(db.String(255))
    description = db.Column(db.Text)
    position = db.Column(db.Integer)
    due_date = db.Column(db.DateTime)

# class Comment(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     card_id = db.Column(db.Integer, db.ForeignKey('card.id'))
#     content = db.Column(db.Text)
#     created_at = db.Column(db.DateTime)

# class Label(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     card_id = db.Column(db.Integer, db.ForeignKey('card.id'))
#     name = db.Column(db.String(255))
#     color = db.Column(db.String(255))