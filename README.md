## Refactorización - Implementación del Patrón Factory

### Objetivo Cumplido
Se ha eliminado el acoplamiento directo entre la interfaz de usuario (`MovementList.jsx`) y las clases concretas de movimientos (`Deposit`, `Payment`, `Withdrawal`, `Transfer`), centralizando la creación de instancias mediante el **patrón Factory Method**.

### Cambios Realizados

#### 1. Creación de MovementFactory.js
Se implementó `src/models/MovementFactory.js` como un **punto único de construcción** que encapsula toda la lógica de instanciación. Esta fábrica:
- Expone un método estático `createMovement(data)`
- Recibe el tipo de movimiento y los datos necesarios
- Contiene un `switch` interno que decide qué clase concreta instanciar
- Devuelve una instancia que cumple con la abstracción `Movement`

#### 2. Refactorización de MovementList.jsx
Se modificó `src/components/MovementList.jsx` para:
- **Eliminar** el `switch` y las llamadas directas a `new Deposit()`, `new Payment()`, etc.
- **Eliminar** los imports de clases concretas (`import { Deposit } from...`)
- **Agregar** un único import: `import { MovementFactory } from '../models/MovementFactory'`
- **Reemplazar** la lógica de creación por: `MovementFactory.createMovement(data)`

#### 3. Implementación de CHARGEBACK (Demostración OCP)
Para demostrar el **Principio Abierto/Cerrado (OCP)**, se agregó un quinto tipo de movimiento:
- **Clase:** `Chargeback` (en `src/models/Chargeback.js`)
- **Comportamiento:** 
  - `getNetAmount()`: Devuelve el monto como valor negativo absoluto
  - `getColor()`: #8b0000 (rojo oscuro)
  - `getIcon()`: ↩️
  - `getTypeName()`: "Contracargo"
- **Integración:** Registrado en `MovementFactory.js` sin modificar la UI

### Beneficios Obtenidos

#### Reducción de Acoplamiento
- **Antes:** La UI importaba y conocía directamente 4 clases concretas
- **Después:** La UI solo conoce `MovementFactory` y la abstracción `Movement`
- **Resultado:** Cambios en el dominio (clases de movimientos) no afectan la UI

#### Incremento de Cohesión
- **Dominio** (`src/models/`): Contiene únicamente la lógica de negocio (clases de movimientos)
- **Fábrica** (`MovementFactory.js`): Se especializa en la creación de instancias
- **UI** (`MovementList.jsx`): Se dedica exclusivamente a la presentación

#### Principio Open/Closed (OCP) Demostrado
El sistema ahora es **abierto para extensión** pero **cerrado para modificación**:

##### Pasos para agregar un nuevo tipo de movimiento:
1. **Crear la clase** en `src/models/` (ej: `NuevoMovimiento.js`)
   ```javascript
   import { Movement } from './Movement.js';
   export class NuevoMovimiento extends Movement {
     getNetAmount() { /* implementación */ }
     getColor() { /* implementación */ }
     getIcon() { /* implementación */ }
     getTypeName() { /* implementación */ }
   }

   ### Cómo Probar el Proyecto

Para ejecutar la aplicación:

```bash
npm install
npm run dev