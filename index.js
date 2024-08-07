const player1 = prompt('Digite o nome do primeiro jogador: ')
const player2 = prompt('Digite o nome do segundo jogador: ')

const x_player = 'X'
const o_player = 'O'

const userWhoPlays = document.getElementById('userWhoPlays')
userWhoPlays.innerText += ' ' + player1

let list_plays = []
let player1_played = []
let player2_played = []
const possible_wins = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]

function checkWin(possibleWins, playerMoves) {
    // Função para verificar se todos os elementos de um array estão em outro array
    function isSubset(subset, set) {
        return subset.every(val => set.includes(val));
    }
    // Verificar cada possível combinação vencedora
    for (let win of possibleWins) {
        if (isSubset(win, playerMoves)) {
            return true;
        }
    }
    return false;
}

document.querySelectorAll('.cell').forEach(function (cellDiv){
    cellDiv.addEventListener('click', function (ev){
        const cellbttn = ev.currentTarget
        if (list_plays.length === 0){
            cellbttn.innerText = x_player
            list_plays.push(x_player)
            player1_played.push(parseInt(cellbttn.dataset.cell))
            // console.log(player1_played)
            userWhoPlays.innerText = 'Jogador da vez: ' + player2
        } else if (list_plays[list_plays.length - 1] === x_player) {
            cellbttn.innerText = o_player
            list_plays.push(o_player)
            player2_played.push(parseInt(cellbttn.dataset.cell))
            const checkIfPlayer2Wins = checkWin(possible_wins, player2_played)
            if (checkIfPlayer2Wins === true){
                alert("O vencedor foi o " + player2 + " !")
            }
            // console.log(player2_played)
            userWhoPlays.innerText = 'Jogador da vez: ' + player1
        } else if (list_plays[list_plays.length - 1] === o_player) {
            cellbttn.innerText = x_player
            list_plays.push(x_player)
            player1_played.push(parseInt(cellbttn.dataset.cell))
            checkIfPlayer1Wins = checkWin(possible_wins, player1_played)
            if (checkIfPlayer1Wins === true){
                alert("O vencedor foi o " + player1 + " !")
            } else if (player1_played.length + player2_played.length === 9){
                alert("Empate! Toque em reiniciar para jogar novamente!")
            }
            // console.log(player1_played)
            userWhoPlays.innerText = 'Jogador da vez: ' + player2
        }
    })
})

document.getElementById('restartBttn').addEventListener('click', function (){
    document.querySelectorAll('.cell').forEach(function (cell){
        cell.innerText = ''
    })
    list_plays = []
    player1_played = []
    player2_played = []
    userWhoPlays.innerText = 'Jogador da vez: '+ player1
})