import {emojisplosion} from "emojisplosion";

export const customEmojisplosion = (emoji) => {
    emojisplosion({
        className: "emoji-effects",
        emojiCount: 10,
        emojis: [emoji],
        position: {
            x: window.innerWidth / 100 * 60,
            y: window.innerHeight / 100 * 80,
        },
        physics: {
            gravity: -0.2,
            rotationDeceleration: 0.3,
            fontSize: 300
        },
        initialVelocities: {
            rotation: {
                max: 0,
                min: 0,
            },
            x: {
                max: 100,
                min: -100,
            },
            y: {
                max: 14,
                min: 11.7,
            },
        }
    })
}

