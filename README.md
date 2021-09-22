# PG-Ecommerce

## Proyecto Grupal E-commerce: «El librero de Mario»

![Imagen_General](client/public/imagen_pagina_catalogo.jpeg)


## Iniciar Proyecto



Clonar Repositorio

```
npm install
npm start

```
Aplicar estos comandos en la carpeta API, y luego en la carpeta CLIENT. Se recomienda primero instalar las dependencias y luego iniciarlas.



__IMPORTANTE__: Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.


## Objetivos del Proyecto
- Construir un E-Commerce utlizando React, Redux, Node, Express y MongoDB.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar metodolgía ágil SCRUM, para trabajar en equipo.

## BoilerPlate
El boilerplate cuenta con dos carpetas: api y client. En estas carpetas estará el código del back-end y el front-end respectivamente.

En api crear un archivo llamado: .env que tenga la siguiente forma:


```
PORT = 4000
DB_CNN= mongodb+srv://{USERMONGO}:{PASSWORDMONGO}@clusterproyecto.ie6co.mongodb.net/proyectoDB
CLAVE_TOKEN= Proyecto_GP__@14b
```

Reemplazar USERMONGO y PASSWORDMONGO con tus propias credenciales para conectarte a Mongo. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

El contenido de client fue creado usando: Create React App.

## Enunciado

La idea general es crear una aplicación en la cual se puedan ver los distintos libros que posee el E-Commerce utilizando la BD de MongoDB, y a partir de ella poder, entre otras cosas:

- Buscar libros
- Filtrarlos/Ordenarlos
- Crear/Editar/Eliminar libros
- Consultar los detalles de cada libro
- Listado de libros favoritos
- Carrito de compras
- Historial de compras
- Pasarela de pagos
- Crear usuarios
- Perfil de usuario
- Historial de pagos
- Sucursales
- Promociones



## Tecnologías implementadas:
 - React
 - Redux
 - Express
 - Node
 - MongoDB
 - HTML5
 - CSS3

## Integrantes del Proyecto:

Matías Sundblad, Dayro Martinez, Mario Jesús Rocha, Ignacio Romanow, Ariel Romero, Andrea Hernández.

## Deploy

https://keen-kirch-0844b7.netlify.app/