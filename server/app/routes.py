from app import app, db
from app.models import *
from flask import request, jsonify
from flask_cors import cross_origin

@app.route("/")
@cross_origin()
def hello_world():
    return "<p>Hello, World!</p>"

# BOARDS

@app.route('/boards', methods=["GET", "POST"])
@cross_origin()
def boards():
    if request.method == 'GET':
        boards = Board.query.all()
        return jsonify([board.serialize() for board in boards])
    else:
        data = request.get_json()
        board = Board(name=data['name'], description=data['description'])
        db.session.add(board)
        db.session.commit()
        return jsonify(board.serialize())

@app.route('/boards/<int:board_id>', methods=['GET', 'PUT', 'DELETE'])
@cross_origin()
def board(board_id):
    board = Board.query.get(board_id)
    if request.method == 'GET':
        return jsonify(board.serialize())
    elif request.method == 'PUT':
        data = request.get_json()
        board.name = data['name']
        board.description = data['description']
        db.session.commit()
        return jsonify(board.serialize())
    else:
        db.session.delete(board)
        db.session.commit()
        return jsonify({'message': 'Board deleted'})


# LISTS

@app.route('/lists', methods=['GET', 'POST'])
@cross_origin()
def lists():
    if request.method == 'GET':
        lists = List.query.all()
        return jsonify([list.serialize() for list in lists])
    else:
        data = request.get_json()
        list = List(
            name=data['name'], 
            position=data['position'], 
            board_id=data['board_id'])
        db.session.add(list)
        db.session.commit()
        return jsonify(list.serialize())

@app.route('/lists/<int:list_id>', methods=['GET', 'PUT', 'DELETE'])
@cross_origin()
def list(list_id):
    list = List.query.get(list_id)
    if request.method == "GET":
        return jsonify(list.serialize())
    elif request.method == 'PUT':
        data = request.get_json()
        list.name = data['name']
        list.position = data['position']
        list.board_id = data['board_id']
        db.session.commit()
        return jsonify(list.serialize())
    else:
        db.session.delete(list)
        db.session.commit()
        return jsonify({'message': 'List deleted'})

# CARD

@app.route('/cards', methods=['GET', 'POST'])
@cross_origin()
def cards():
    if request.method == 'GET':
        cards = Card.query.all()
        return jsonify([card.serialize() for card in cards])
    else:
        data = request.get_json()
        card = Card(
            list_id=data['list_id'],
            name=data['name'], 
            position=data['position'], 
            description=data['description'],
            due_date=data['due_date'], 
            )
        db.session.add(card)
        db.session.commit()
        return jsonify(card.serialize())

@app.route('/cards/<int:card_id>', methods=['GET', 'PUT', 'DELETE'])
@cross_origin()
def card(card_id):
    card = Card.query.get(card_id)
    if request.method == "GET":
        return jsonify(card.serialize())
    elif request.method == 'PUT':
        data = request.get_json()
        card.list_id = data['list_id']
        card.name = data['name']
        card.description = data['description']
        card.due_date = data['due_date']
        card.position = data['position']
        db.session.commit()
        return jsonify(card.serialize())
    else:
        db.session.delete(card)
        db.session.commit()
        return jsonify({'message': 'Card deleted'})