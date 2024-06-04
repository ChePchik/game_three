class Character extends Sprite {
	constructor({
		position,
		velocity,
		image,
		frames = { max: 1, hold: 10 },
		sprites,
		animate = true,
		rotation = 0,
		scale = 1,
		dialogue = [""],
	}) {
		// Вызов конструктора родительского класса Sprite
		super({
			position,
			velocity,
			image,
			frames,
			sprites,
			animate,
			rotation,
			scale,
		});

		// Диалоги для персонажа
		this.dialogue = dialogue;
		// Индекс текущего диалога
		this.dialogueIndex = 0;
	}
	// draw() {
	// 	// Отрисовка прямоугольника для отладки, закомментирована для продакшн-кода
	// 	c.fillStyle = "rgba(255, 255, 0, 0.5)";
	// 	c.fillRect(this.position.x, this.position.y, this.width, this.height);
	// }
}
