class CollisionBlock {
	static width = 48; // Статические свойства для ширины и высоты блоков
	static height = 48;

	constructor({ position }) {
		// Устанавливаем ширину и высоту блока, используя статические свойств
		this.position = position;
		this.width = 48;
		this.height = 48;
	}

	draw() {
		// Устанавливаем стиль заливки для отрисовки блока
		c.fillStyle = "rgba(255, 0, 0, 0.5)";
		// Рисуем прямоугольник, представляющий блок столкновения
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}
