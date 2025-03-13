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

## 4. La Navegación

- Ejercicio 1

Tomar el proyecto social-map y efectuar los siguientes cambios:

1. Hacer que al clicar login, verifique un usuario y una contraseña, quemados en la pagina de login (Luego modificaremos esto), y si son los correctos, navegue a la página tabs.

2. La página tabs, debe presentar las páginas de nuesta app social-map y no los tabs.

Las páginas/tabs son: Mapa, Feed, Contacto, Perfil

3. Los tabs deben ser iconos de Ionicons.

4. Cada tab debe navegar a su página (En tabs)

- Ejercicio 2

En el proyecto social-map, realizar los siguientes cambios:

1. Agregar un link de "He olvidado mi contraseña".

2. Este link, debe abrir un Alert.

3. El Alert debe presentar un campo de texto pidiendo la dirección de correo electrónico del usuario, un botón de confirmación y uno para cancelar la operación.

4. El Alert debería tener un titulo explicando que es y un breve texto explicando el proceso de recuperación de contraseña.

5. Al confirmarse la operación, mostrar un toast informando la operación y redirigir a la página de Login.

- Ejercicio 3

Tomar el proyecto social-map y realizar los siguientes cambios:

1. Crear una página nueva "registro", para crear nuevas cuentas.

2. Esta página debe tener un formulario con los siguientes campos:

Nombre, Apellidos, E-mail, Provincia, Ciudad, Edad.
Y un botón de confirmación.

3. Al clicar en el botón de confirmación, mostrar un Toast informando al usuario que se ha creado su cuenta y se ha enviado una contraseña provisoria a su correo electrónico. Luego redirigir a Login.

## 5. Formularios

- Ejercicio 1

En el proyecto social-map, realizar los siguientes ajustes:

1. Implementar el formulario de la página Login con ReactiveForms.

No te olvides de agregar validación para los campos.

2. Implementar el formulario de la página Registro con ReactiveForms.

No te olvides de agregar validación para cada campo.

- Ejercicio 2

En el proyecto social-map, realizar los siguientes ajustes:

1. En la página Post (Donde crearemos posts), crear un formulario con ReactiveForms que tenga los siguientes campos:

   - Titulo
   - Texto
   - Contactos etiquetados
   - Imagen(es) y/o vídeo(s)

2. El formulario debe servir tanto para crear como para editar nuevos posts.

- Ejercicio 3

En el proyecto social-map, realizar los siguientes ajustes:

1. En la página Perfil (Perfil de usuario), crear un formulario con ReactiveForms que tenga los siguientes campos:

   - Imagen de perfil
   - Nombre
   - Apellidos
   - Fecha de nacimiento
   - Sexo
   - E-mail
   - Teléfono

2. Tendrá otro formulario donde se podrá cambiar la contraseña, con los siguientes campos:

   - Contraseña anterior
   - Nueva contraseña
   - Confirme nueva contraseña

3. Cada uno de estos formularios, debe tener su botón de Enviar respectivo y su flujo de trabajo.
