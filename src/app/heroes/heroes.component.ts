import { Component } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  #selectedHero?: Hero;
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.getHeroes();
  }

  get selectedHero(): Hero | undefined {
    return this.#selectedHero;
  }

  private getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(x => this.heroes = x);
  }

  onSelect(hero: Hero) {
    if (this.#selectedHero === hero) {
      this.#selectedHero = undefined;
      this.messageService.add(`HeroesComponent: Deselected`);
    }
    else {
      this.#selectedHero = hero;
      this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
    }
  }
}
