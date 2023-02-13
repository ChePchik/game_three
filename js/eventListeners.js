let lastKey = "";
window.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "w":
			keys.w.pressed = true;
			lastKey = "w";
			break;
		case "a":
			keys.a.pressed = true;
			lastKey = "a";
			break;

		case "s":
			keys.s.pressed = true;
			lastKey = "s";
			break;

		case "d":
			keys.d.pressed = true;
			lastKey = "d";
			break;

		case " ":
			for (let i = 0; i < portal.length; i++) {
				const p = portal[i];

				console.log(player.position);
				// console.log(player);
				// console.log();
				console.log(p.position);
				// console.log(p);
				console.log();
				console.log(player.position.x, "player.position.x ");
				console.log(player.position.x + player.width, "player.position.x + player.width");
				console.log(p.position.x + p.width, "p.position.x + p.width");
				console.log(p.position.x, "p.position.x ");

				if (
					player.position.x <= p.position.x + p.width &&
					player.position.x + player.width >= p.position.x &&
					player.position.y + player.height >= p.position.y &&
					player.position.y <= p.position.y + p.height
				) {
					console.log("1");
					p.play();
				}
			}

			break;
	}
});

window.addEventListener("keyup", (e) => {
	switch (e.key) {
		case "w":
			keys.w.pressed = false;
			break;
		case "a":
			keys.a.pressed = false;
			break;
		case "s":
			keys.s.pressed = false;
			break;
		case "d":
			keys.d.pressed = false;
			break;
	}
});
