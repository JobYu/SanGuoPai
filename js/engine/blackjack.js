// Blackjack Logic: Deck and Hand point calculation

const SUITS = ['♠', '♥', '♣', '♦'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    get value() {
        if (['J', 'Q', 'K'].includes(this.rank)) return 10;
        if (this.rank === 'A') return 11; // Default to 11
        return parseInt(this.rank);
    }

    toString() {
        return `${this.suit}${this.rank}`;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.reset();
    }

    reset() {
        this.cards = [];
        for (const suit of SUITS) {
            for (const rank of RANKS) {
                this.cards.push(new Card(suit, rank));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        if (this.cards.length === 0) {
            this.reset();
            this.shuffle();
        }
        return this.cards.pop();
    }
}

class Hand {
    constructor() {
        this.cards = [];
    }

    addCard(card) {
        this.cards.push(card);
    }

    getPoints() {
        let points = 0;
        let aceCount = 0;

        for (const card of this.cards) {
            points += card.value;
            if (card.rank === 'A') aceCount++;
        }

        // Adjust for Aces (adaptive calculation: 11 -> 1 if points > 21)
        while (points > 21 && aceCount > 0) {
            points -= 10;
            aceCount--;
        }

        return points;
    }

    isBust() {
        return this.getPoints() > 21;
    }

    isBlackjack() {
        return this.cards.length === 2 && this.getPoints() === 21;
    }

    clear() {
        this.cards = [];
    }
}

export { Deck, Hand, Card, SUITS, RANKS };
