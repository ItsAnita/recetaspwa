import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit, signal, PLATFORM_ID, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

interface Recipe {
  id: number;
  title: string;
  img: string;
  shortDescription: string;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule,RouterModule
  ],
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent  implements OnInit{

  private router = inject(Router);

  recipes:Recipe[] = [
    {
      id: 1,
      title: 'Pasta Carbonara',
      img:'assets/img/pasta.jpg',
      shortDescription: 'Una deliciosa pasta italiana con salsa cremosa y panceta crujiente.'
    },
    {
      id: 2,
      title: 'Ensalada Otoñal',
     img:'assets/img/salad.jpg',
      shortDescription: 'Una ensalada con ingredientes otoñales'
    },
    {
      id: 3,
      title: 'Ramen',
      img:'assets/img/ramen.jpg',
      shortDescription: 'Auténtico ramen japones'
    },
    {
      id: 4,
      title: 'Ramen',
      img:'assets/img/ramen.jpg',
      shortDescription: 'Auténtico ramen japones'
    },
    {
      id: 3,
      title: 'Ramen',
      img:'assets/img/ramen.jpg',
      shortDescription: 'Auténtico ramen japones'
    }
  ];


  deferredPrompt: any = null; // Asegura que deferredPrompt esté inicializado como null
  showInstallPrompt = false; // Controla la visibilidad del modal
  hasInstalled = false; // Bandera para saber si la app ya está instalada

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit() {
    // Verifica si está en el navegador (y no en el servidor)
    if (isPlatformBrowser(this.platformId)) {
      /*
      // Verifica si la aplicación ya está instalada
      if (window.matchMedia('(display-mode: standalone)').matches) {
        this.hasInstalled = true;
      }

      // Opcional: Puedes verificar localStorage si deseas recordar la elección del usuario
      const installStatus = localStorage.getItem('installStatus');
      if (installStatus === 'installed') {
        this.hasInstalled = true;
      }else{
        this.showInstallPrompt=true;
      }*/
        this.checkInstallStatus();
    }
  }

  checkInstallStatus() {
    // Si está en modo "standalone", significa que está instalada
    this.hasInstalled = window.matchMedia('(display-mode: standalone)').matches;

    // Si no está instalada, revisa el localStorage
    if (!this.hasInstalled) {
      const installStatus = localStorage.getItem('installStatus');
      if (installStatus === 'installed') {
        // La aplicación fue instalada pero no está en modo standalone, se asume que se desinstaló
        localStorage.removeItem('installStatus'); // Limpiar el estado anterior
      } else if (installStatus === 'dismissed') {
        this.showInstallPrompt = false; // Si fue descartada, no mostrar el modal
      } else {
        this.showInstallPrompt = true; // Muestra el modal si no hay estado almacenado
      }
    }
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      event.preventDefault(); // Evita que el navegador muestre el prompt automáticamente
      this.deferredPrompt = event; // Guarda el evento para usarlo después

      // Muestra el modal solo si la app no está instalada
      if (!this.hasInstalled) {
        this.showInstallPrompt = true; // Abre el modal de instalación
      }
    }
  }

  async installApp() {
    if (isPlatformBrowser(this.platformId) && this.deferredPrompt) {
      this.showInstallPrompt = false; // Oculta el modal
      this.deferredPrompt.prompt(); // Muestra el prompt de instalación

      const { outcome } = await this.deferredPrompt.userChoice; // Espera la elección del usuario
      if (outcome === 'accepted') {
        console.log('Usuario aceptó la instalación');
        localStorage.setItem('installStatus', 'installed'); // Guarda el estado en localStorage
      } else {
        console.log('Usuario rechazó la instalación');
        localStorage.setItem('installStatus', 'dismissed');
      }

      this.deferredPrompt = null; // Limpia deferredPrompt después de usarlo
      this.hasInstalled = true; // Marca la app como instalada
    }
  }

  dismissInstall() {
    this.showInstallPrompt = false; // Oculta el modal
    localStorage.setItem('installStatus', 'dismissed'); // Guarda el estado de rechazo
  }

  goToRecipe(id: number): void {
    this.router.navigate(['/recipe', id]);
  }


  showModal: boolean = false;

  // Método para abrir el modal
  openModal() {
    this.showModal = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.showModal = false;
  }


 }
