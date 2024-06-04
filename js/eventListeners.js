// Переменная для отслеживания последней нажатой клавиши
let lastKey = "";

// Обработчик событий для нажатия клавиш
window.addEventListener("keydown", (e) => {
	if (player.isInteracting) {
		switch (e.key) {
			case " ":
				player.interactionAsset.dialogueIndex++;

				const { dialogueIndex, dialogue } = player.interactionAsset;
				if (dialogueIndex <= dialogue.length - 1) {
					document.querySelector("#characterDialogueBox").innerHTML =
						player.interactionAsset.dialogue[dialogueIndex];
					return;
				}

				// finish conversation
				player.isInteracting = false;
				player.interactionAsset.dialogueIndex = 0;
				document.querySelector("#characterDialogueBox").style.display = "none";

				break;
		}
		return;
	}

	switch (e.key) {
		case " ":
			if (!player.interactionAsset) return;

			// beginning the conversation
			const firstMessage = player.interactionAsset.dialogue[0];
			document.querySelector("#characterDialogueBox").innerHTML = firstMessage;
			document.querySelector("#characterDialogueBox").style.display = "flex";
			player.isInteracting = true;
			break;
		// Если нажата клавиша "w"
		case "w":
			keys.w.pressed = true; // Устанавливаем флаг, что клавиша "w" нажата
			lastKey = "w"; // Запоминаем последнюю нажатую клавишу
			break;
		// Если нажата клавиша "a"
		case "a":
			keys.a.pressed = true; // Устанавливаем флаг, что клавиша "a" нажата
			lastKey = "a"; // Запоминаем последнюю нажатую клавишу
			break;
		// Если нажата клавиша "s"
		case "s":
			keys.s.pressed = true; // Устанавливаем флаг, что клавиша "s" нажата
			lastKey = "s"; // Запоминаем последнюю нажатую клавишу
			break;
		// Если нажата клавиша "d"
		case "d":
			keys.d.pressed = true; // Устанавливаем флаг, что клавиша "d" нажата
			lastKey = "d"; // Запоминаем последнюю нажатую клавишу
			break;
		// Если нажата клавиша пробела
		case " ":
			// Проверяем столкновение с порталом
			for (let i = 0; i < portal.length; i++) {
				const p = portal[i]; // Получаем текущий портал

				// Выводим информацию о позиции игрока и портала в консоль для отладки
				console.log(player.position);
				console.log(p.position);
				console.log(player.position.x, "player.position.x ");
				console.log(player.position.x + player.width, "player.position.x + player.width");
				console.log(p.position.x + p.width, "p.position.x + p.width");
				console.log(p.position.x, "p.position.x ");

				// Проверяем столкновение игрока с порталом
				if (
					player.position.x <= p.position.x + p.width &&
					player.position.x + player.width >= p.position.x &&
					player.position.y + player.height >= p.position.y &&
					player.position.y <= p.position.y + p.height
				) {
					console.log("1");
					p.play(); // Запускаем функцию play() для портала
				}
			}
			break;
	}
});

// Обработчик событий для отпускания клавиш
window.addEventListener("keyup", (e) => {
	switch (e.key) {
		// Если отпущена клавиша "w"
		case "w":
			keys.w.pressed = false; // Сбрасываем флаг, что клавиша "w" нажата
			break;
		// Если отпущена клавиша "a"
		case "a":
			keys.a.pressed = false; // Сбрасываем флаг, что клавиша "a" нажата
			break;
		// Если отпущена клавиша "s"
		case "s":
			keys.s.pressed = false; // Сбрасываем флаг, что клавиша "s" нажата
			break;
		// Если отпущена клавиша "d"
		case "d":
			keys.d.pressed = false; // Сбрасываем флаг, что клавиша "d" нажата
			break;
	}
});
