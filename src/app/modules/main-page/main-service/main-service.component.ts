import {Component} from '@angular/core';

@Component({
  selector: 'app-main-service',
  templateUrl: './main-service.component.html',
  styleUrls: ['./main-service.component.sass']
})
export class MainServiceComponent {
  services: { title: string, link: string, icon: string }[] = [
    {title: 'Добавление прошедших приемов пищи', link: '/diary', icon: 'assets/images/icon/service/1.svg'},
    {title: 'Планирование будущих приемов пищи', link: '/diary', icon: 'assets/images/icon/service/2.svg'},
    {title: 'Автоматический подсчет КБЖУ на день', link: '/diary', icon: 'assets/images/icon/service/3.svg'},
    {title: 'Создание собственных рецептов', link: '/recipes/create', icon: 'assets/images/icon/service/4.svg'}
  ]
}
