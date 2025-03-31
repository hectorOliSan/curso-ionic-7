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

## 6. Conectividad con API Rest y peticiones HTTP

- Ejercicio 1

Tomar el proyecto social-map y realizar las siguientes mejoras:

1. justar la página de Perfil para que trabaje con UsersFacade para editar la información de usuario. El email no se debe poder cambiar.

2. Una vez editada la información, debe mostrar un toast de exito.

3. Crear el flujo de Facade, Request y la implementación del cambio de contraseña.

> Nota: Puedes montar tu backend, o bien que las requests devuelvan siempre un valor fijo.

- Ejercicio 2

Tomar el proyecto social-map y realizar las siguientes mejoras:

1. Crear PostsRequest con métodos que contemplen un CRUD.

2. Crear PostsFacade con métodos que contengan los de PostsRequest.

3. Ajustar la página Post para que trabaje con PostsFacade a la hora de crear un nuevo post.

> Nota: Puedes montar tu backend, o bien que las requests devuelvan siempre un valor fijo.

- Ejercicio 3

Tomar el proyecto social-map y realizar las siguientes mejoras:

1. Tomar la página Registro y agregar un AsyncValidator que revise si el email ingresado ya está siendo utilizado o no.

2. Tomar la página de Login, e implementar UsersService en el flujo de inicio de sesión.

> Nota: Puedes montar tu backend, o bien que las requests devuelvan siempre un valor fijo.

## 7. Ionic Native

- Ejercicio 1

¿Qué ventajas nos da utilizar Ionic Native?

- Ejercicio 2

¿Cómo nos permite Ionic Native la comunicación entre la capa Web de nuestras aplicaciones y la capa nativa de los dispositivos iOS y Android?

- Ejercicio 3

¿Qué ventajas nos brida Capacitor por sobre Cordova?

## 8. Geolocalización y Mapas

- Ejercicio 1

Abrimos nuestro proyecto social-map y hacemos los siguientes cambios:

1. Instalar y configurar el plugin de Geolocalización de Capacitor

- Ejercicio 2

Abrimos nuestro proyecto social-map y hacemos los siguientes cambios:

1. Crear una API Key de Google Maps para el proyecto.

2. Instalar y configurar la API de GoogleMaps de Capacitor.

- Ejercicio 3

Abrimos nuestro proyecto social-map y hacemos los siguientes cambios:

1. Implementar una instancia de GoogleMaps en la pagina de mapa.

2. Agregar un método a cargo de agregar marcadores a este mapa.

3. Agregar latitud y longitud a las propiedades del Post, para esto, en la página de creación/edición de posts, capturar las coordenadas del dispositivo con el plugin Geolocation de Capacitor.

## 9. Cámara y Vídeo

- Ejercicio 1

Tomar nuestro proyecto social-map y hacer lo siguiente:

1. Instalar todo lo necesario para tomar fotos y almacenarlas en el dispositivo.

2. Ajustar permisos para iOS y Android

3. Ajustar la página de Post para que permita tomar una foto y asignarla al post.

- Ejercicio 2

Tomar nuestro proyecto social-map y hacer los siguientes cambios:

1. Instalar todo lo necesario para gestionar vídeos.

2. Ajustar permisos para iOS y Android.

3. Ajustar la página de Post para permitir grabar vídeo y adosarlo al Post.

- Ejercicio 3

Crear un proyecto nuevo y hacer lo siguiente:

1. Instalar todo lo necesario para leer códigos QR.

2. Implementar una página con un botón que permita escanear un código.

3. El código escaneado tiene que mostrarse en pantalla.

## 10. Otras APIs de interés de Ionic Native

- Ejercicio 1

Tomar nuestro proyecto social-map y realizar los siguientes cambios:

1. Agregar una Splash Screen que se presente por 5 segundos y se difumine en 2 segundos.

2. Elegir un logo cualquiera y montar iconos tanto para Android como para iOS.

- Ejercicio 2

Crear un proyecto nuevo de Ionic y realizar lo siguiente:

1. Hacer que el dispositivo vibre cuando haya algún cambio en la red (Podemos probar con activar y desactivar el modo avión).

- Ejercicio 3

Crear un proyecto de Ionic y realizar los siguientes cambios:

1. Mostrar una notificación local cada vez que cambie la orientación de la pantalla del dispositivo.

## 11. Almacenamiento Local

- Ejercicio 1

Tomar nuestro proyecto social-map y realizar los siguientes cambios:

1. Instalar y configurar SQLite

2. Crear un servicio encargado de inicializar la base de datos.

3. El servicio encargado de la inicialización, debe contemplar la importación de la estructura base de la base de datos. Esta se puede contener dentro de la aplicación o descargar de un servicio externo.

- Ejercicio 2

Tomar nuestro proyecto social-map y realizar los siguientes cambios sobre el resultado del ejercicio #1:

1. Crear un servicio de cacheo de peticiones que guarde en cache las peticiones hechas al servidor.

2. Implementar el flujo offline para el servicio de Posts ya implementado anteriormente.

3. Las peticiones cacheadas deben expirar luego de 90 minutos de almacenadas.

- Ejercicio 3

Tomar nuestro proyecto social-map y realizar los siguientes cambios sobre el resultado del ejercicio #2:

1. Agregar un método que permita exportar la base de datos.

2. Montar la estructura de la base de datos contemplando las entidades: Usuarios, Posts, Etiquetas, Media, Contactos.

## 12. Firebase como BAAS

- Ejercicio 1

Tomar el proyecto social-map y realizar los siguientes cambios:

1. Crear un perfil de Firebase y montar las siguientes entidades en Firestore:

   - Usuarios
   - Posts
   - Etiquetas
   - Media
   - Contactos

2. Montar y/o adaptar requests para cada entidad que nos permitan gestionar CRUD de cada una.

3. Montar fachadas que consuman estos requests.

- Ejercicio 2

Tomar el proyecto social-map y realizar los siguientes cambios:

1.  En la consola de Firebase, montar la lógica necesaria para gestionar autenticación de usuarios.

2.  Al registrarse un usuario, debe tener un registro con datos adicionales en la colección de usuarios.

3.  Ajustar la página de login para que funcione con Firebase (Al menos, e-mail y password).

4.  Ajustar la página de registro para que funcione con Firebase.

5.  Montar un Auth Guard que custodie las rutas privadas.

- Ejercicio 3

Tomar el proyecto social-map y realizar los siguientes cambios:

1.  Montar el flujo de creación de Posts. (Puedes agregar un botón flotante en la página del mapa, que nos lleve a la página de creación de Posts, o como mejor consideres).

2.  Presentar todos los Posts de amigos en la página principal. Cada post debe tener un marcador en el mapa. Al clicar en el marcador, debe abrir un modal con los detalles del post.

## 13. Apariencia de la Aplicación

- Ejercicio 1

Crear un proyecto Ionic nuevo:

1. Crear el proyecto con el template tabs

2. Crear un tema personalizado. Puedes utilizar herramientas como Coloors para elegir/crear una paleta de colores, y luego adaptarlo a Ionic con el generador de colores.

- Ejercicio 2

Crear un proyecto Ionic nuevo:

1. Crear un tema oscuro para el proyecto del punto #1

- Ejercicio 3

Tomar el proyecto social-map y realizar los siguientes cambios:

1. Crear un tema de colores con una paleta de colores a tu elección.

2. Crear un tema oscuro para la aplicación.
