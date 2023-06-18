import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-initials-avatar',
  templateUrl: './initials-avatar.component.html',
  styleUrls: ['./initials-avatar.component.scss']
})
export class InitialsAvatarComponent implements OnInit {
  @Input()
  name!: string;
  @Input() size: number = 90;

  initials!: string;
  backgroundColor!: string;

  ngOnInit() {
    const nameParts = this.name.split(' ');
    this.initials = nameParts.map(part => part[0]).join('').toUpperCase();
    this.backgroundColor = this.generateBackgroundColor();
  }

  generateBackgroundColor(): string {
    // Lógica para generar un color de fondo aleatorio
    const colors = ['#FFC107', '#03A9F4', '#4CAF50', '#E91E63', '#9C27B0', '#FF5722', '#009688'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
}


