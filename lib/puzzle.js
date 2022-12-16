// TODO
const tiles = document.querySelectorAll("td")
const showHint = document.getElementById("show-hint");

showHint.addEventListener('click', (event) => {
    let hintDiv = document.querySelector(".hint");
    hintDiv.classList.toggle('active')
})

// Função para mover a tile clicada
const moveTile = (clickedTile) => {
    // 1. Encontrar qual é o elemento vazio
    // 2. Substituir o valor númerico da tile vazia pela tile de destino.
    // 3. Remover a classe 'empty' do elemento que está vazio (vamos chamar de emptyTile)
    // 4. Adicionar a classe 'empty' na tile clicada
    // 5. Retirar o valor da tile clicada
    const emptyTile =document.querySelector(".empty")
    emptyTile.innerHTML = clickedTile.innerHTML
    emptyTile.classList.remove("empty")
    clickedTile.classList.add("empty")
    clickedTile.innerHTML = ""
}

// Função para verificar se a tile pode se mover ou não
const canMove = (clickedTile) => {
    // 1. Descobrir quais os indices da tile clicada
    // console.log("clickedTile:\n" + clickedTile.cellIndex + " " + clickedTile.parentElement.rowIndex)
    const tileColumn = clickedTile.cellIndex
    const tileRow = clickedTile.parentElement.rowIndex
    // 2. Procurar os indices da tile que contém a classe empty
    const emptyTile = document.querySelector(".empty")
    const emptyTileColumn = emptyTile.cellIndex
    const emptyTileRow = emptyTile.parentElement.rowIndex
            // Verifica se pode se mover p/ direita
    return (tileRow === emptyTileRow && tileColumn === emptyTileColumn - 1) ||
           // Verifica se pode se mover p/ esquerda
           (tileRow === emptyTileRow && tileColumn === emptyTileColumn + 1) ||
           // Verifica se pode ser mover p/ cima
           (tileColumn === emptyTileColumn && tileRow === emptyTileRow - 1) ||
           // Verifica se pode ser mover p/ baixo
           (tileColumn === emptyTileColumn && tileRow === emptyTileRow + 1)
}

const checkVictory = () => {
    // 1. Transformar as tiles em um array com seus respectivos valores
    const listOfTiles = Array.from(tiles).map(tile => Number.parseInt(tile.innerHTML, 10))
    // 2. Se as tiles estiverem na ordem correta, mostramos um alerta de vitória ao jogador.
    if (listOfTiles.join() === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,NaN") {
        alert('You Win!!')
    }
}
// Para cada tile (célula), iremos ter um eventListener
tiles.forEach((tile) => {
    tile.addEventListener('click', (event) => {
        if (canMove(event.currentTarget)) {
            moveTile(event.currentTarget)
            setTimeout(() => { checkVictory() }, 300)
        }
    })
})