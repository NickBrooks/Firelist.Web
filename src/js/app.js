import { getParameterByName } from './functions';

// ES6 Class
class TypeWriter {
    constructor(txtElement, words, wait = 1000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 100;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    if (txtElement != null) {
        const wait = txtElement.getAttribute('data-wait');
        const words = [
            'Gym at 6.30am',
            'Reply to Trevor in 2 hours',
            'Halloween on October 31st',
            'Pay power bill next month',
            'Take a study break in 30 mins',
            'Charity run on September 17th',
            'Social basketball 6pm on Thursday',
            'Book a haircut in 4 weeks',
            'Binge Netflix at 7pm'
        ];
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);

        // set copyright date
        var d = new Date();
        document.getElementById("yearString").innerText = d.getFullYear();
    }

    // set the userID
    document.getElementById("userId").value = getParameterByName("userId");
}