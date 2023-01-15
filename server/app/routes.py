from app import app, db
from app.models import *
from flask import request, jsonify

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/boards', methods=["GET", "POST"])
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