import {OnInit} from '@angular/core';

export interface OlbCard extends OnInit {
    /** Card title. */
    title: string;
    /** Settings for the card. This property may vary from card to card. */
    cardSettings?: any;
}