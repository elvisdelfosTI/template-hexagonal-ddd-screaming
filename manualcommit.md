# Manual: Conventional Commits con GitFlow

---

## **Introducción**

El estándar de **Conventional Commits** proporciona una forma clara y estructurada de escribir mensajes de commit en Git. Combinado con **GitFlow**, se logra un flujo de trabajo eficiente que facilita el desarrollo colaborativo y la automatización.

Este manual detalla cómo implementar Conventional Commits dentro de la estrategia GitFlow.

---

## **1. GitFlow: Flujo de Trabajo**

GitFlow organiza el desarrollo en ramas principales y auxiliares:

### **Ramas principales:**

- **`master`**: Contiene las versiones en producción.
- **`feature`**: Contiene el código en desarrollo para la próxima versión.

### **Ramas auxiliares:**

- **`feature/nombre-de-la-rama`**: Para desarrollar nuevas funcionalidades.  
    Derivan de `feature` y se integran nuevamente en esta rama.
- **`hotfix/nombre-de-la-rama`**: Para corregir errores críticos en producción.  
  Derivan de `master` y se integran en `master` y `develop`.

### **Flujo general:**

1. Crear una rama `feature/nombre-de-la-rama` para una nueva funcionalidad.
2. Mergear la rama `feature/nombre-de-la-rama` en `develop` cuando esté lista.
3. Crear una rama `release/nombre-de-la-rama` para estabilizar una versión.
4. Mergear la rama `release/nombre-de-la-rama` en `master` y `develop`.
5. Crear una rama `hotfix/nombre-de-la-rama` para corregir errores críticos en producción.
6. Mergear la rama `hotfix/nombre-de-la-rama` en `master` y `develop`.

---

## **2. Convención de Mensajes: Conventional Commits**

Los mensajes de commit siguen este formato:

```plaintext
<tipo>[opcional alcance]: <descripción>
```
