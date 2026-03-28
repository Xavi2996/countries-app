# CountryApp

Aplicación web desarrollada con Angular que consume una API de países para explorar información por ciudad, país o región, enfocada en rendimiento, buenas prácticas modernas y experiencia de usuario.

--------------------------------------------------

Descripción

Esta aplicación permite buscar y explorar información de países de forma dinámica.
Implementa Angular moderno con Signals, manejo de estado eficiente y optimización de llamadas a servicios.

El proyecto está diseñado para demostrar:

- Arquitectura limpia en Angular
- Uso de Signals (signal, computed, linkedSignal)
- Manejo de rutas dinámicas y query params
- Optimización de performance con cache
- UI moderna con Tailwind + DaisyUI

--------------------------------------------------

Tecnologías

- Angular (Signals API)
- TypeScript
- TailwindCSS
- DaisyUI
- RxJS (cuando aplica)
- API de países (ej: REST Countries)

--------------------------------------------------

Funcionalidades

- Búsqueda por:
  - País
  - Ciudad
  - Región

- Navegación con rutas dinámicas
- Manejo de query params en URL
- Cache de llamadas a la API (evita requests innecesarios)
- Estado reactivo con Signals
- UI moderna y limpia con DaisyUI
- Responsive (en progreso)

--------------------------------------------------

Arquitectura & Buenas prácticas

- Separación clara:
  - Services (consumo API + cache)
  - Components (UI)
  - Signals para estado reactivo

- Uso de:
  - signal() → estado base
  - computed() → valores derivados
  - linkedSignal() → estado derivado editable

- Manejo eficiente de cambios sin necesidad de patrones pesados
- Navegación basada en rutas con parámetros dinámicos

--------------------------------------------------

Optimización

- Cache de respuestas HTTP para evitar llamadas repetidas
- Uso de Signals para minimizar renders innecesarios
- Lazy evaluation con computed

--------------------------------------------------

Estructura del proyecto

src/
 ├── app/
 │   ├── components/
 │   ├── pages/
 │   ├── services/
 │   ├── interfaces/
 │   ├── routes/
 │   └── Mapper

--------------------------------------------------

Instalación

git clone https://github.com/Xavi2996/countries-app.git
npm install
ng serve

--------------------------------------------------

Estado del proyecto

- Funcionalidad principal completa
- Responsive en progreso
- Posibles mejoras futuras:
  - Tests unitarios
  - Mejoras de UX

--------------------------------------------------

Autor

Desarrollado por Xavier Cobos

