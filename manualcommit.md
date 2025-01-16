# Manual: Conventional Commits con GitFlow

---

## **Introducción**

El estándar de **Conventional Commits** proporciona una forma clara y estructurada de escribir mensajes de commit en Git. Combinado con **GitFlow**, se logra un flujo de trabajo eficiente que facilita el desarrollo colaborativo y la automatización.

Este manual detalla cómo implementar Conventional Commits dentro de la estrategia GitFlow.

---

## **1. GitFlow: Flujo de Trabajo**

GitFlow organiza el desarrollo en ramas principales y auxiliares:

### **Ramas principales:**

- **`main`**: Contiene las versiones en producción.
- **`develop`**: Contiene el código en desarrollo para la próxima versión.

### **Ramas auxiliares:**

- **`feature`**: Para desarrollar nuevas funcionalidades.  
  Derivan de `develop` y se integran nuevamente en esta rama.
- **`release`**: Para preparar una nueva versión.  
  Derivan de `develop` y se integran en `main` y `develop`.
- **`hotfix`**: Para corregir errores críticos en producción.  
  Derivan de `main` y se integran en `main` y `develop`.

### **Flujo general:**

1. Crear una rama `feature` para una nueva funcionalidad.
2. Mergear la rama `feature` en `develop` cuando esté lista.
3. Crear una rama `release` para estabilizar una versión.
4. Mergear la rama `release` en `main` y `develop`.
5. Crear una rama `hotfix` para corregir errores críticos en producción.
6. Mergear la rama `hotfix` en `main` y `develop`.

---

## **2. Convención de Mensajes: Conventional Commits**

Los mensajes de commit siguen este formato:

```plaintext
<tipo>[opcional alcance]: <descripción>
```
