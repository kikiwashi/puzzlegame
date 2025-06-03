document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('puzzle-board');
    const message = document.getElementById('completion-message');

    const rows = 4;
    const cols = 4;
    const totalPieces = rows * cols;

    // Пути ко всем частям пазла
    const piecePaths = [];
    for (let i = 1; i <= totalPieces; i++) {
        piecePaths.push(`images/${i}.jpg`);
    }

    // Правильный порядок картинок
    const correctOrder = [...piecePaths];

    // Создаем ячейки
    for (let i = 0; i < totalPieces; i++) {
        const cell = document.createElement('div');
        cell.className = 'puzzle-piece';
        cell.dataset.index = i;

        // Добавляем случайное изображение
        const img = document.createElement('img');
        img.src = piecePaths[Math.floor(Math.random() * piecePaths.length)];
        img.dataset.cellIndex = i;
        img.dataset.correctSrc = correctOrder[i]; // правильная часть

        cell.appendChild(img);
        board.appendChild(cell);

        // При клике меняем на случайную
        cell.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * piecePaths.length);
            img.src = piecePaths[randomIndex];
            checkCompletion();
        });
    }

    // Проверка завершения
    function checkCompletion() {
        let correctCount = 0;

        const cells = board.querySelectorAll('.puzzle-piece');
        cells.forEach((cell, index) => {
            const img = cell.querySelector('img');
            if (!img) return;

            const correctPath = correctOrder[index];

            // Сравниваем конец пути (номер файла)
            if (img.src.endsWith(correctPath.split('/').pop())) {
                correctCount++;
            }
        });

        if (correctCount === totalPieces) {
            message.classList.remove('hidden');
        }
    }
});