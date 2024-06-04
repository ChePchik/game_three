// Функция для проверки столкновения двух прямоугольников
function rectangularCollision({ rectangle1, rectangle2 }) {
	return (
		rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
		rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
		rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
		rectangle1.position.y + rectangle1.height >= rectangle2.position.y
	);
}

// Функция для проверки столкновения игрока с персонажами
function checkForCharacterCollision({ characters, player, characterOffset = { x: 0, y: 0 } }) {
	// Сбрасываем текущее взаимодействие игрока
	player.interactionAsset = null;

	// Проверяем столкновение с каждым персонажем
	for (let i = 0; i < characters.length; i++) {
		const character = characters[i];

		if (
			rectangularCollision({
				rectangle1: player,
				rectangle2: {
					...character,
					position: {
						x: character.position.x + characterOffset.x,
						y: character.position.y + characterOffset.y,
					},
				},
			})
		) {
			// Если обнаружено столкновение, устанавливаем текущего персонажа как объект взаимодействия
			player.interactionAsset = character;
			break;
		}
	}
}

// Функция для разбора данных в двумерный массив
function parse2D(data) {
	const rows = [];
	for (let i = 0; i < data.length; i += 70) {
		rows.push(data.slice(i, i + 70));
	}
	return rows;
}

// Функция для создания объектов из двумерного массива данных
function createObjectsFrom2D(data) {
	const objects = [];
	data.forEach((row, i) => {
		row.forEach((symbol, j) => {
			if (symbol === 1025) {
				// Если символ соответствует значению 1025, добавляем новый блок столкновения в массив boundaries
				boundaries.push(
					new CollisionBlock({
						position: {
							x: j * CollisionBlock.width + offset.x,
							y: i * CollisionBlock.height + offset.y,
						},
					}),
				);
			}
		});
	});
	return objects;
}
