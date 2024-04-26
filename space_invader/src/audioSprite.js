import audioSprite from "../public/sound/audio_sprites/b1-sound.json" assert { type: 'json' }

const sprite = {}
audioSprite.forEach((each) => {
    sprite[each.id] = {
        start: each.start / 1000,
        end: each.end / 1000,
        loop: false
    }
})
console.log(JSON.stringify(sprite))