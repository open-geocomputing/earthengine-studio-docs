---
title: Datos y Docs
description: Busque conjuntos de datos oficiales y comunitarios, inspeccione los metadatos completos, inserte expresiones iniciales y use la referencia de la API integrada.
permalink: /es/data-and-docs/
order: 5
lang: es
translation_key: data-and-docs
keywords: [catálogo, conjuntos de datos, STAC, datos comunitarios, panel Docs, referencia de la API, búsqueda, fragmentos de código]
translated_from: 8ca026a55037
---

## Busque en el catálogo

La búsqueda global de conjuntos de datos se ejecuta en el navegador sobre índices
incluidos en el repositorio. Combina el catálogo de Earth Engine de Google con
Awesome GEE Community Datasets y clasifica las coincidencias según
identificadores, títulos, palabras clave, bandas, proveedores y descripciones.

Introduzca el ID de un conjunto de datos, una misión, un sensor, un proveedor o
un tema. Los identificadores exactos aparecen primero; la coincidencia aproximada
acotada ayuda con pequeños errores tipográficos en títulos y palabras clave. Las
búsquedas amplias conservan resultados sólidos de las fuentes oficiales y
comunitarias, en lugar de permitir que un catálogo ocupe todos los espacios
visibles.

Los iconos de los resultados distinguen las imágenes ráster, las colecciones
ráster y las tablas. Las entradas obsoletas se atenúan y se etiquetan, pero sus
identificadores siguen pudiendo copiarse para que se pueda seguir investigando un
flujo de trabajo antiguo.

## Abra los detalles de un conjunto de datos

Al seleccionar un resultado se abre una pestaña central persistente. Las entradas
del catálogo oficial pueden cargar los metadatos STAC completos directamente
desde Google Storage, incluidos bandas, unidades, resolución, longitud de onda,
escalado, desplazamientos, propiedades, máscaras de bits, términos y ejemplos del
origen.

Las entradas comunitarias cargan su descripción y sus ejemplos incluidos en el
repositorio de origen. Su atribución y sus enlaces de origen permanecen visibles
para que pueda evaluar el mantenimiento y la licencia antes de depender de un
conjunto de datos.

La lista de resultados ofrece acciones de copiar e insertar para una expresión
inicial compacta. Las pestañas de detalles abiertas se centran en los metadatos y
las acciones de copia, de modo que los cambios automáticos en el código siguen
siendo explícitos.

<div class="notice" markdown="1">
**Autoridad del catálogo**

Use el [Earth Engine Data Catalog](https://developers.google.com/earth-engine/datasets/catalog)
de Google para conocer el estado oficial de los conjuntos de datos. Los registros
comunitarios son contribuciones de terceros y conservan sus propios términos y
expectativas de soporte.
</div>

## Use el panel Docs

El panel **Docs** es la referencia a nivel de función, con búsqueda, dentro de
Studio. Combina:

1. el registro de algoritmos de Earth Engine incluido en el repositorio;
2. firmas complementarias de conveniencia de Earth Engine;
3. los globales de Studio, los mapas, las figuras de Plotly y las API de
   gráficos;
4. las firmas generadas de exportación a la nube;
5. las firmas generadas de descarga local de Studio.

Las entradas identifican su origen. Las entradas oficiales de Earth Engine
enlazan con las páginas de referencia de Google; las extensiones de Studio se
mantienen locales y no pretenden ser API de Google. Abra un resultado para ver
los parámetros, los valores devueltos, las descripciones y los ejemplos
disponibles.

Los mismos metadatos impulsan el autocompletado de Monaco y la ayuda al pasar el
cursor. Si un identificador inferido de `Map`, figura o gráfico tiene métodos
compatibles, el autocompletado sigue ese identificador en lugar de presentar una
lista global no relacionada.

## Sepa dónde buscar

Use el panel **Docs** de la aplicación para conocer la superficie exacta que
Studio expone actualmente. Use la [referencia de la API](https://developers.google.com/earth-engine/apidocs)
de Google para la documentación completa de las clases y los algoritmos de Earth
Engine. Use las [guías para desarrolladores](https://developers.google.com/earth-engine/guides)
de Google para conceptos como la ejecución diferida, la escala, las proyecciones,
el filtrado, el mapeo y la reducción.

La documentación de Studio se centra en cómo interactúan esas API con este
espacio de trabajo. No reproduce el material didáctico completo de Earth Engine.

## Detalles y límites

Docs, el autocompletado y la ayuda al pasar el cursor incluyen funciones auxiliares de alto nivel del cliente de JavaScript y métodos heredados, además de los algoritmos del servidor; por ejemplo, `ee.ImageCollection.linkCollection`, los métodos de agregación de colecciones y las funciones auxiliares heredadas. Use la navegación contextual del editor para abrir la referencia de la API o el recurso correspondiente. Estas adiciones documentan la superficie invocable; los valores de Earth Engine siguen siendo cálculos diferidos del lado del servidor.
