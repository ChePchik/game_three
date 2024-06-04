class Reaction extends Character {
	constructor({
		position,
		velocity,
		image,
		frames = { max: 1, hold: 10 },
		sprites,
		animate = false,
		rotation = 0,
		scale = 1,
		onComplete,
	}) {
		// Вызов конструктора родительского класса Character
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

		// Устанавливаем функцию, которая будет вызвана при завершении
		this.onComplete = onComplete;
		// Индекс текущего диалога (может использоваться в будущем)
		this.dialogueIndex = 0;
	}

	// Метод для отрисовки объекта на холсте
	draw() {
		// Закомментированные строки для сохранения состояния холста и трансформации
		// c.save();
		// c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
		// c.rotate(this.rotation);
		// c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);
		// c.globalAlpha = this.opacity;

		// Расчет области кадра для отрисовки
		const crop = {
			position: {
				x: this.frames.val * (this.width / this.scale),
				y: 0,
			},
			width: this.image.width / this.frames.max,
			height: this.image.height,
		};

		// Позиция и размер изображения на холсте
		const image = {
			position: {
				x: this.position.x,
				y: this.position.y,
			},
			width: this.image.width / this.frames.max,
			height: this.image.height,
		};

		// Отрисовка изображения на холсте
		c.drawImage(
			this.image,
			crop.position.x,
			crop.position.y,
			crop.width,
			crop.height,
			image.position.x,
			image.position.y,
			image.width * this.scale,
			image.height * this.scale,
		);

		// Отрисовка прямоугольника для отладки (показывает границы объекта)
		c.fillStyle = "rgba(255, 255, 0, 0.5)";
		c.fillRect(this.position.x, this.position.y, this.width, this.height);

		// Восстановление состояния холста после трансформации (закомментировано выше)
		c.restore();

		// Если анимация не включена, выходим из метода
		if (!this.animate) return;

		// Увеличиваем счетчик кадров, если анимация включена
		if (this.frames.max > 1) {
			this.frames.elapsed++;
		}

		// Смена кадра анимации
		if (this.frames.elapsed % this.frames.hold === 0) {
			if (this.frames.val < this.frames.max - 1) this.frames.val++;
			else this.frames.val = 0;
		}
	}

	// Метод для выполнения действия при завершении
	play() {
		console.log("onComplete");
		this.onComplete();
	}
}
