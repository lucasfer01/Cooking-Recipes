
# Cooking Recipes

Proyecto individual sobre recetas de cocina realizado con el objetivo de afianzar los conocimientos de las tecnologías aprendidas.

### Características

La app puede mostrar más de 5000 recetas de cocina como base, además de poder crear las propias recetas y guardarlas para su posterior uso. Cuenta con filtrados por nombre, tipo de dieta, puntuación y orden alfabético. Además se pueden editar y/o eliminar las recetas creadas.

</br>

## Como esta construida la app?

Para el Backend se utiliza `Node js` y `Express js` para levantar el servidor y `Sequelize` con `PostgreSQL` para la base de datos donde se alojarán las recetas que cree el usuario. Además de utilizar una api pública de [Spoonacular](https://spoonacular.com/food-api/docs) para las recetas.

Para el Frontend se utiliza `JavaScript` y `React` para la estructura, `Redux` para los estados globales y `CSS` para los estilos.


# Screenshots

## Frontend

### Landing

<img src='media/landing.jpeg' height='400'/>


### Home

<img src='media/home-1.jpeg' height='400'/>
<img src='media/home-2.jpeg' height='400'/>
<img src='media/filtro.jpeg' height='400'/>


### Agregar recetas

<img src='media/agregar-recetas.jpeg' height='400' />


### Recetas creadas

<img src='media/recetas-creadas.jpeg' height='400' />

## Backend

### Respuestas

<img src='media/respuesta.jpeg' height='400'/>


### Algunas rutas

<img src='media/codigo.jpeg' height='400'/>


### API

<img src='media/json.jpeg' height='400'/>

## Como usarlo localmente

Clonar el repositorio

```bash
  git clone https://github.com/lucasfer01/Cooking-Recipes.git
```

Ir a la carpeta api

```bash
  cd api
```

Instalar dependencias

```bash
  npm install
```

Levantar el servidor

```bash
  npm start
```

#### Abrir otra consola y abrir la carpeta del projecto

Ir a la carpeta client

```bash
  cd client
```

Instalar dependencias

```bash
  npm install
```

Levantar la aplicación

```bash
  npm start
```

## Variables de entorno

Para poder correr el servidor correctamente debemos crear un archivo llamado `.env` dentro de la carpeta `api`. Tambien debemos de tener instalado el PostgreSQL.

Dentro del archivo debemos crear las siguientes variables.

`DB_USER=postgres`

`DB_PASSWORD=numeral6`

`DB_HOST=localhost`

`API_KEY=a6383e7d0b8643a482402c81a10727a9`

<img src='media/variables-de-entorno.jpeg' height='400'/>

