from app import db 

class Board(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    description = db.Column(db.Text)
    lists = db.relationship('List', backref='board', lazy="select")

    def __init__(self, name, description):
        self.name = name
        self.description = description
    
    def serialize(self, with_lists=False):
        board = {
            'id': self.id, 
            'name': self.name,
            'description': self.description,
        }
        if(with_lists): board.update({
            'lists': [list.serialize() for list in self.lists]})
        return board
        
    def serialize_without_lists():
        return 

class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey('board.id'))
    name = db.Column(db.String(255))
    position = db.Column(db.Integer)
    cards = db.relationship('Card', backref='board', lazy="select")
    
    def __init__(self, name, position, board_id):
        self.name = name
        self.position = position
        self.board_id = board_id
    
    def serialize(self, with_cards=False):
        list = {
            "id": self.id,
            "name": self.name,
            "position": self.position,
            "board_id": self.board_id,
        }
        if(with_cards): list.update({
            "cards": [card.serialize() for card in self.cards],
        })
        return list

class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'))
    name = db.Column(db.String(255))
    description = db.Column(db.Text)
    position = db.Column(db.Integer)
    due_date = db.Column(db.DateTime)
    
    def __init__(self, list_id, name, description, position, due_date):
        self.list_id = list_id
        self.name = name
        self.description = description
        self.position = position
        self.due_date = due_date
        
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "position" : self.position,
            "due_date" : self.due_date,
            "list_id": self.list_id
        }

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