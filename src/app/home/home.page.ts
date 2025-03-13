import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  public lipsum: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet consectetur ipsum. Cras venenatis quam magna, sit amet eleifend augue laoreet volutpat. Quisque pulvinar, tortor ut semper congue, mauris magna ultrices tortor, a tempor purus libero eget velit. Ut et pulvinar nibh, quis feugiat odio. Duis gravida tortor et auctor pretium. Etiam mollis ornare ligula vitae placerat. Nam augue dui, condimentum in pellentesque ac, tempus vitae lectus. Fusce tincidunt quam eu dolor vestibulum faucibus. Mauris porttitor ante vitae ex ultricies, eget elementum dui laoreet. Sed id nibh vitae ligula efficitur ornare. Morbi venenatis, lorem vel cursus ultricies, neque purus ultrices justo, eget consectetur dolor neque et nunc.';

  public countries = [
    'España',
    'Bélgica',
    'Francia',
    'Alemania',
    'Suecia',
    'Suiza',
    'Austria',
    'Portugal',
    'Italia',
    'Croacia',
  ];

  public results: string[] = [...this.countries];

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();

    this.results = this.countries.filter((country: string) => {
      return country.toLowerCase().startsWith(query);
    });
  }

  constructor() {}
}

