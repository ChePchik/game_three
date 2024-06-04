const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

const offset = {
	x: -735,
	y: -650,
};
// let battleZonesMap = parse2D(battleZonesData);
let boundaries = [];
let portal = [];
let collisionsMap;
let collisionBlocks;
let image;
let background;
let foregroundImage;
let foreground;
let movables;
let renderables;
let lvl = 0;

let movableChar;

let battleZones = [];

let characters = [];

// Загрузка изображений игрока
const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./img/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./img/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./img/playerRight.png";

// Создание игрока
const player = new Sprite({
	position: {
		x: canvas.width / 2 - 192 / 4 / 2,
		y: canvas.height / 2 - 68 / 2,
	},
	image: playerDownImage,
	frames: {
		max: 4,
		hold: 10,
	},
	sprites: {
		up: playerUpImage,
		left: playerLeftImage,
		right: playerRightImage,
		down: playerDownImage,
	},
});

let level = 1;
let levels = [
	{
		init: () => {
			boundaries = [];
			portal = [];
			// player.position.x = canvas.width / 2 - 192 / 4 / 2;
			// player.position.y = canvas.height / 2 - 68 / 2;
			// Парсинг карты столкновений и создание объектов
			collisionsMap = parse2D(collisions_level1);
			collisionBlocks = createObjectsFrom2D(collisionsMap);

			foregroundImage = new Image();
			foregroundImage.src = "./img/foregroundObjects.png";

			image = new Image();
			image.src = "./img/Pellet Town.png";
			// Создание фона и переднего плана
			background = new Sprite({
				position: {
					x: offset.x,
					y: offset.y,
				},
				image: image,
			});

			foreground = new Sprite({
				position: {
					x: offset.x,
					y: offset.y,
				},
				image: foregroundImage,
			});
			// Загрузка изображений персонажей
			const villagerImg = new Image();
			villagerImg.src = "./img/villager/Idle.png";

			const portalImg = new Image();
			portalImg.src = "./img/portal.png";

			const oldManImg = new Image();
			oldManImg.src = "./img/oldMan/Idle.png";
			// Создание портала
			portal.push(
				new Reaction({
					position: {
						x: 177,
						y: 326,
					},
					image: portalImg,
					frames: {
						max: 1,
						hold: 60,
					},
					scale: 1,
					animate: true,
					onComplete: () => {
						console.log("OK");
						levels[1].init();
					},
					// dialogue: ["...", "Hey mister, have you seen my Doggochu?"],
				}),
			);
			// Создание персонажей
			characters.push(
				new Character({
					position: {
						x: 515,
						y: 438,
					},
					image: oldManImg,
					frames: {
						max: 4,
						hold: 60,
					},
					scale: 3,
					dialogue: ["My bones hurt."],
				}),
			);
			// Создание персонажей
			characters.push(
				new Character({
					position: {
						x: 615,
						y: 338,
					},
					image: villagerImg,
					frames: {
						max: 4,
						hold: 60,
					},
					scale: 3,
					dialogue: ["My bones hurt."],
				}),
			);

			// Создаем экземпляр MovableCharacter
			movableChar = new MovableCharacter({
				position: { x: 100, y: 100 },
				velocity: { x: 2, y: 2 }, // Настройте скорость по вашему усмотрению
				image: playerDownImage,
				frames: { max: 4, hold: 10 },
				sprites: {
					up: playerUpImage,
					left: playerLeftImage,
					right: playerRightImage,
					down: playerDownImage,
				},
				animate: true,
				rotation: 0,
				scale: 1,
				dialogue: ["Привет, я персонаж!"],
				path: [
					// Задаем путь, по которому будет двигаться персонаж
					{ x: 100, y: 100 },
					{ x: 300, y: 100 },
					{ x: 300, y: 300 },
					{ x: 100, y: 300 },
					{ x: 100, y: 100 },
				],
			});
			// characters.push(movableChar);

			// Установка объектов, которые можно перемещать и отрисовывать
			movables = [
				background,
				...boundaries,
				foreground,
				...battleZones,
				...characters,
				...portal,
				movableChar,
			];
			renderables = [
				background,
				...boundaries,
				...battleZones,
				...characters,
				...portal,
				player,
				foreground,
				movableChar,
			];
		},
	},
	// 2 уровень
	{
		init: () => {
			boundaries = [];
			portal = [];

			collisionsMap = parse2D(collisions_level2);
			collisionBlocks = createObjectsFrom2D(collisionsMap);

			image = new Image();
			image.src = "./img/Pellet Town3.png";

			background = new Sprite({
				position: {
					x: offset.x,
					y: offset.y,
				},
				image: image,
			});
			// player.position.x = canvas.width / 2 - 192 / 4 / 2;
			// player.position.y = canvas.height / 2 - 68 / 2;
			const portalImg = new Image();
			portalImg.src = "./img/portal.png";

			portal.push(
				new Reaction({
					position: {
						x: 177,
						y: 326,
					},
					image: portalImg,
					frames: {
						max: 1,
						hold: 60,
					},
					scale: 1,
					animate: true,
					onComplete: () => {
						console.log("OK");
						levels[0].init();
					},
					// dialogue: ["...", "Hey mister, have you seen my Doggochu?"],
				}),
			);

			movables = [background, ...boundaries, ...portal];
			renderables = [background, ...boundaries, ...portal, player];
		},
	},
];

const keys = {
	w: {
		pressed: false,
	},
	a: {
		pressed: false,
	},
	s: {
		pressed: false,
	},
	d: {
		pressed: false,
	},
};

function animate() {
	// Функция анимации
	const animationId = window.requestAnimationFrame(animate);
	// Отрисовка всех объектов
	renderables.forEach((renderable) => {
		renderable.draw();
	});

	movableChar.update();

	let moving = true;
	player.animate = false;

	// Обработка ввода и движение игрока
	if (keys.w.pressed && lastKey === "w") {
		player.animate = true;
		player.image = player.sprites.up;

		checkForCharacterCollision({
			characters,
			player,
			characterOffset: { x: 0, y: 3 },
		});

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary,
						position: {
							x: boundary.position.x,
							y: boundary.position.y + 3,
						},
					},
				})
			) {
				moving = false;
				break;
			}
		}

		if (moving)
			movables.forEach((movable) => {
				movable.position.y += 3;
			});
	} else if (keys.a.pressed && lastKey === "a") {
		player.animate = true;
		player.image = player.sprites.left;

		checkForCharacterCollision({
			characters,
			player,
			characterOffset: { x: 3, y: 0 },
		});

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary,
						position: {
							x: boundary.position.x + 3,
							y: boundary.position.y,
						},
					},
				})
			) {
				moving = false;
				break;
			}
		}

		if (moving)
			movables.forEach((movable) => {
				movable.position.x += 3;
			});
	} else if (keys.s.pressed && lastKey === "s") {
		player.animate = true;
		player.image = player.sprites.down;

		checkForCharacterCollision({
			characters,
			player,
			characterOffset: { x: 0, y: -3 },
		});

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary,
						position: {
							x: boundary.position.x,
							y: boundary.position.y - 3,
						},
					},
				})
			) {
				moving = false;
				break;
			}
		}

		if (moving)
			movables.forEach((movable) => {
				movable.position.y -= 3;
			});
	} else if (keys.d.pressed && lastKey === "d") {
		player.animate = true;
		player.image = player.sprites.right;

		checkForCharacterCollision({
			characters,
			player,
			characterOffset: { x: -3, y: 0 },
		});

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary,
						position: {
							x: boundary.position.x - 3,
							y: boundary.position.y,
						},
					},
				})
			) {
				moving = false;
				break;
			}
		}

		if (moving)
			movables.forEach((movable) => {
				movable.position.x -= 3;
			});
	}
}
// Инициализация первого уровня и запуск анимации
levels[lvl].init();
animate();

// Обработка нажатия кнопки для смены уровней
const btn = document.querySelector("button");

btn.addEventListener("click", function () {
	console.log("button");
	lvl++;
	if (lvl % 2 != 0) levels[1].init();
	else levels[0].init();
});
