/*
Name: Anthony Barros 
Student Number: 250974431

Description: 

This is a connect4 game built with simplistic functionality

class requirements:

In the simplified version,you’ll need to implement the following:

-Two players represented by two colors (red and yellow) take turns in selecting a grid-cell
-Create the grid using buttons
-When a user clicks on one of the buttons,it turns into the current player’s color and becomes unclickable. -If 4 buttons ofthe same color were connected (either vertically or horizontally),the player of that color is declared the winner,and the game is over.
-If all the cells were occupied,the game is over.

TODO: 

want to include "time travel" using the tutorial here: https://reactjs.org/tutorial/tutorial.html#completing-the-game

simplified class requirements
*/


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

/*
this is where im gonna make the button that puts the grid on the screen
*/
class CreateGrid extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        boardOn: false,
      };
      this.whenClicked = this.whenClicked.bind(this);
    }

    whenClicked(event) {
      this.setState({
        boardOn: !this.state.boardOn
      });
    }

    renderBoard() {
      if (this.state.boardOn){
        return <Board />;
      } else {
        return null;
      }
    }

    render() {
      return (
        <div> 
          <button className = "gridButton" onClick = {this.whenClicked} label = "create the board">
            Turn the board ON or OFF
          </button>
          <div>
            {this.renderBoard()}
          </div>
        </div>
      );
    }
}

/*
above this is where im testing the button that instantiates the grid
*/ 
  
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          squares: Array(42).fill(null),
          xIsNext: true,
        };
    }

    checkColumn(columnIn, input, squares) {

      if (columnIn.includes(input)){
        const column = columnIn.slice().reverse();

        for (let element of column) {
            if (squares[element] === null) {
                squares[element] = this.state.xIsNext ? 'X' : 'O';
                this.setState({
                    squares: squares,
                    xIsNext: !this.state.xIsNext
                });
                break;
            }   
        }
      }
    }

    //refactor this code to make it less repetitive
    handleClick(i) {
        const squares = this.state.squares.slice();

        const column0 = [0,7,14,21,28,35];
        const column1 = [1,8,15,22,29,36];
        const column2 = [2,9,16,23,30,37];
        const column3 = [3,10,17,24,31,38];
        const column4 = [4,11,18,25,32,39];
        const column5 = [5,12,19,26,33,40];
        const column6 = [6,13,20,27,34,41];

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        
        //check which column the selected cell belongs to
        //then figure out which of the cells below the one selected are free
        //populate the cell at the bottom of the column selected if its value is null

        this.checkColumn(column0, i, squares);

        this.checkColumn(column1, i, squares);

        this.checkColumn(column2, i, squares);

        this.checkColumn(column3, i, squares);

        this.checkColumn(column4, i, squares);

        this.checkColumn(column5, i, squares);

        this.checkColumn(column6, i, squares);

        console.log(squares);
    }    

    renderSquare(i) {
      return <Square value = {this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
    }
  
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
          </div>
          <div className="board-row">
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
          </div>
          <div className="board-row">
            {this.renderSquare(14)}
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
            {this.renderSquare(20)}
          </div>
          <div className="board-row">
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
            {this.renderSquare(25)}
            {this.renderSquare(26)}
            {this.renderSquare(27)}
          </div>
          <div className="board-row">
            {this.renderSquare(28)}
            {this.renderSquare(29)}
            {this.renderSquare(30)}
            {this.renderSquare(31)}
            {this.renderSquare(32)}
            {this.renderSquare(33)}
            {this.renderSquare(34)}
          </div>
          <div className="board-row">
            {this.renderSquare(35)}
            {this.renderSquare(36)}
            {this.renderSquare(37)}
            {this.renderSquare(38)}
            {this.renderSquare(39)}
            {this.renderSquare(40)}
            {this.renderSquare(41)}
          </div>
        </div>
      );
    }
  }
  
class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <CreateGrid />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

function calculateWinner(squares) {

    const winningArrays = [
        [0, 1, 2, 3],
        [41, 40, 39, 38],
        [7, 8, 9, 10],
        [34, 33, 32, 31],
        [14, 15, 16, 17],
        [27, 26, 25, 24],
        [21, 22, 23, 24],
        [20, 19, 18, 17],
        [28, 29, 30, 31],
        [13, 12, 11, 10],
        [35, 36, 37, 38],
        [6, 5, 4, 3],
        [0, 7, 14, 21],
        [41, 34, 27, 20],
        [1, 8, 15, 22],
        [40, 33, 26, 19],
        [2, 9, 16, 23],
        [39, 32, 25, 18],
        [3, 10, 17, 24],
        [38, 31, 24, 17],
        [4, 11, 18, 25],
        [37, 30, 23, 16],
        [5, 12, 19, 26],
        [36, 29, 22, 15],
        [6, 13, 20, 27],
        [35, 28, 21, 14],
        [0, 8, 16, 24],
        [41, 33, 25, 17],
        [7, 15, 23, 31],
        [34, 26, 18, 10],
        [14, 22, 30, 38],
        [27, 19, 11, 3],
        [35, 29, 23, 17],
        [6, 12, 18, 24],
        [28, 22, 16, 10],
        [13, 19, 25, 31],
        [21, 15, 9, 3],
        [20, 26, 32, 38],
        [36, 30, 24, 18],
        [5, 11, 17, 23],
        [37, 31, 25, 19],
        [4, 10, 16, 22],
        [2, 10, 18, 26],
        [39, 31, 23, 15],
        [1, 9, 17, 25],
        [40, 32, 24, 16],
        [9, 17, 25, 33],
        [8, 16, 24, 32],
        [11, 17, 23, 29],
        [12, 18, 24, 30],
        [1, 2, 3, 4],
        [5, 4, 3, 2],
        [8, 9, 10, 11],
        [12, 11, 10, 9],
        [15, 16, 17, 18],
        [19, 18, 17, 16],
        [22, 23, 24, 25],
        [26, 25, 24, 23],
        [29, 30, 31, 32],
        [33, 32, 31, 30],
        [36, 37, 38, 39],
        [40, 39, 38, 37],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 16, 23, 30],
        [10, 17, 24, 31],
        [11, 18, 25, 32],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
      ]

    for (let i = 0; i < winningArrays.length; i++) {
        let [a, b, c, d] = winningArrays[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
          return squares[a];
        }
    }

    if (!squares.includes(null)){
      console.log('here');
      return 'no one! It is a draw';
    }
    
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  