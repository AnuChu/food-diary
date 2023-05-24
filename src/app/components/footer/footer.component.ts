import {Component} from '@angular/core';
import {tuiIconChevronUpLarge} from "@taiga-ui/icons";

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.sass']
})

export class FooterComponent {
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  protected readonly tuiIconChevronUpLarge = tuiIconChevronUpLarge;
}
