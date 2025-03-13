# Curso de Ionic 7

## 1. Introducción y Configuración

- Ejercicio 1

A lo largo del curso, iremos trabajando en un proyecto final que consta de una red social con un mapa donde se pueden ubicar geográficamente las publicaciones.

Para comenzar, crea un nuevo proyecto Ionic y llámalo social-map.

Como plantilla recomiendo side-menu.

- Ejercicio 2

Para asegurarnos de que la base de nuestra aplicación está funcionando correctamente, configúrala como una PWA y ejecútala en el entorno local.

- Ejercicio 3

Por último, asegúrate que todo funciona a la hora de compilar para dispositivos móviles.

Ejecuta la aplicación en Android, y, si dispones de un equipo Apple, ejecútala en un simulador de iOS.

## 2. La estructura de las Pages

- Ejercicio 1

1. Crear un proyecto nuevo de Ionic en blanco.
2. Agregar a la página principal un header que contenta una toolbar con el título de la página.
3. El header debe ser transparente y fijo.
4. Cargar contenido dummy (Lipsum) en el content de la página.

- Ejercicio 2

1. Al proyecto anterior, agregar una search-bar
2. La search-bar debe tener un ícono personalizado (Recuerda que puedes utilizar cualquiera de Ionicons).
3. El search-bar debe ser de color azul sólo en modo md.

- Ejercicio 3

1. Agrega a nuestro proyecto de este módulo, un footer.
2. Este footer debe tener una toolbar.
3. La toolbar del footer, debe contener una search-bar.
4. La search-bar debe filtrar una lista de 10 países.
5. Agrega un debounce de 2 segundos al search-bar.

## 3. Los Componentes

- Ejercicio 1

Vamos a crear una nueva página en nuestro proyecto social-map.

`ionic generate page pages/login`

Esta será nuestra página de login.

Vamos a necesitar un formulario donde pidamos nombre de usuario, contraseña y un botón de login.

También un link a la página de registro, para los usuarios nuevos.

Debemos utilizar, al menos, ion-grid, ion-list, ion-input, ion-button.

Trata de personalizar los estilos que puedas.

- Ejercicio 2

Vamos a crear otra una nueva página en nuestro proyecto social-map.

`ionic generate page pages/feed`

Esta será nuestra página de feed.

Esta página consiste de una lista de ion-cards, cada card tiene un titulo, subtítulo y contenido.

El contenido puede ser una imagen o un texto.

De momento, tomemos el contenido de un array.

El contenido de esta página se debe recargar al hacer pull-to-refresh.

- Ejercicio 3

Vamos a crear una tercera nueva página en nuestro proyecto social-map.

`ionic generate page pages/contacts`

Esta será nuestra página de contactos.

El cuerpo, será una lista de avatars, cada avatar con un avatar, un titulo (nombre del contacto), y un subtítulo con la fecha de la última publicación.

El cuerpo de la página debe estar contenido y gestionado por un ion-infinite-scroll.