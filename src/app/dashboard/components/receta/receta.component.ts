import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

interface Recipe {
  id: number;
  title: string;
  img: string;
  ingredients: string[];
  instructions: string[];
}

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './receta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecetaComponent implements OnInit{
  private route = inject(ActivatedRoute);
  recipe: Recipe | undefined;

  recipes: Recipe[] = [
    {
      id: 1,
      title: 'Pasta Carbonara',
      img: 'assets/img/pastaF.jpg',
      ingredients: ['400g de espaguetis', '200g de panceta', '4 huevos', '100g de queso pecorino rallado', 'Pimienta negra'],
      instructions: [
        'Cocina la pasta en agua con sal según las instrucciones del paquete.',
        'Mientras tanto, corta la panceta en cubitos y fríela hasta que esté crujiente.',
        'En un bol, mezcla los huevos, el queso rallado y pimienta negra generosa.',
        'Escurre la pasta y mézclala rápidamente con la mezcla de huevo y la panceta.',
        'Sirve inmediatamente con más queso rallado por encima.'
      ]
    },
    {
      id: 2,
      title: 'Ensalada Otoñal',
      img: 'assets/img/saladFondo.avif',
      ingredients: [
        '200g de mezcla de hojas verdes (rúcula, espinacas, lechuga)',
        '1 calabaza butternut pequeña, pelada y cortada en cubos',
        '100g de queso de cabra desmenuzado',
        '50g de nueces pecanas',
        '50g de arándanos secos',
        '1 granada, desgranada',
        '2 cucharadas de aceite de oliva',
        '1 cucharada de miel',
        '1 cucharada de vinagre balsámico',
        'Sal y pimienta al gusto'
      ],
      instructions: [
        'Precalienta el horno a 200°C.',
        'Coloca los cubos de calabaza en una bandeja de horno, rocía con aceite de oliva y sazona con sal y pimienta. Asa durante 20-25 minutos hasta que estén tiernos y dorados.',
        'Mientras tanto, tuesta las nueces pecanas en una sartén seca a fuego medio hasta que estén fragantes.',
        'En un bol grande, mezcla las hojas verdes, la calabaza asada, el queso de cabra, las nueces pecanas, los arándanos secos y los granos de granada.',
        'Para el aderezo, mezcla el aceite de oliva, la miel y el vinagre balsámico en un tarro con tapa. Agita bien para emulsionar.',
        'Vierte el aderezo sobre la ensalada justo antes de servir y mezcla suavemente.',
        'Sirve inmediatamente y disfruta de tu ensalada otoñal.'
      ]
    },
    {
      id: 3,
      title: 'Ramen Japonés',
      img: 'assets/img/ramenF.jpg',
      ingredients: [
        '200g de fideos ramen',
        '4 tazas de caldo de pollo o vegetales',
        '2 dientes de ajo picados',
        '1 trozo de jengibre fresco rallado',
        '2 cucharadas de salsa de soja',
        '1 cucharada de miso',
        '2 huevos',
        '100g de pechuga de pollo cocida y en rodajas',
        '1 taza de espinacas baby',
        '1 zanahoria en juliana',
        '2 cebollas verdes picadas',
        'Hojas de nori cortadas en tiras',
        'Aceite de sésamo al gusto'
      ],
      instructions: [
        'En una olla grande, calienta el caldo de pollo o vegetales a fuego medio.',
        'Añade el ajo picado, el jengibre rallado, la salsa de soja y el miso. Mezcla bien y deja cocinar a fuego lento durante 10 minutos.',
        'Mientras tanto, cocina los huevos en agua hirviendo durante 6-7 minutos para que queden semicocidos. Enfríalos en agua con hielo y pélalos.',
        'Cocina los fideos ramen según las instrucciones del paquete. Escurre y reserva.',
        'Divide los fideos cocidos en dos tazones grandes.',
        'Vierte el caldo caliente sobre los fideos.',
        'Añade la pechuga de pollo en rodajas, las espinacas baby, la zanahoria en juliana y medio huevo en cada tazón.',
        'Espolvorea con cebolla verde picada y tiras de nori.',
        'Añade unas gotas de aceite de sésamo al gusto.',
        'Sirve caliente y disfruta de tu ramen casero.'
      ]
    }
  ];

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id']; // El '+' convierte el string a número
      this.recipe = this.recipes.find(r => r.id === id);
    });
  }

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }
}
