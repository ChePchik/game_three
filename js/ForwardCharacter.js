class MovableCharacter extends Character {
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
		path = [], // массив точек, по которым движется персонаж
	}) {
		super({
			position,
			image,
			frames,
			sprites,
			animate,
			rotation,
			scale,
			dialogue,
		});

		this.velocity = velocity;
		this.path = path;
		this.currentPoint = 0;
		this.direction = 1; // Направление движения: 1 - вперед, -1 - назад
	}

	update() {
		if (this.path.length === 0) {
			return; // Нечего делать, если не задан путь
		}

		const targetPoint = this.path[this.currentPoint];

		const dx = targetPoint.x - this.position.x;
		const dy = targetPoint.y - this.position.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance > 1) {
			const vx = (dx / distance) * this.velocity.x;
			const vy = (dy / distance) * this.velocity.y;

			this.position.x += vx;
			this.position.y += vy;
		} else {
			// Если достигли текущей точки, переходим к следующей
			this.currentPoint += this.direction;

			// Проверяем, не достигли ли конца или начала пути
			if (this.currentPoint >= this.path.length || this.currentPoint < 0) {
				// Меняем направление движения на противоположное
				this.direction *= -1;
				// Переходим к следующей точке с учетом нового направления
				this.currentPoint += this.direction;
			}
		}
	}
}
