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

    clone() {
        return new Card(this.suit, this.rank);
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
    constructor(betMultiplier = 1) {
        this.cards = [];
        this.betMultiplier = betMultiplier; // 1 for normal, 2 for double down
        this.isDoubleDown = false;
        this.isStand = false;
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

    canSplit() {
        // Can split if exactly 2 cards and they have the same rank
        if (this.cards.length !== 2) return false;
        return this.cards[0].rank === this.cards[1].rank;
    }

    canDoubleDown() {
        // Can double down on first two cards only
        return this.cards.length === 2 && !this.isDoubleDown;
    }

    doubleDown(card) {
        // Double the bet and draw exactly one card
        this.betMultiplier = 2;
        this.isDoubleDown = true;
        this.addCard(card);
        this.isStand = true; // Must stand after double down
    }

    stand() {
        this.isStand = true;
    }

    clear() {
        this.cards = [];
        this.betMultiplier = 1;
        this.isDoubleDown = false;
        this.isStand = false;
    }

    clone() {
        const newHand = new Hand(this.betMultiplier);
        newHand.cards = this.cards.map(c => c.clone());
        newHand.isDoubleDown = this.isDoubleDown;
        newHand.isStand = this.isStand;
        return newHand;
    }
}

// Split helper: splits a hand into two hands
function splitHand(hand, deck) {
    if (!hand.canSplit()) return null;

    const card1 = hand.cards[0].clone();
    const card2 = hand.cards[1].clone();

    const hand1 = new Hand(hand.betMultiplier);
    hand1.addCard(card1);
    hand1.addCard(deck.draw());

    const hand2 = new Hand(hand.betMultiplier);
    hand2.addCard(card2);
    hand2.addCard(deck.draw());

    return [hand1, hand2];
}

export { Deck, Hand, Card, SUITS, RANKS, splitHand };
