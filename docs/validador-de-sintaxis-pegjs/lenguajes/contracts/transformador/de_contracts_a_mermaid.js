function generateMermaidDiagram(data) {
  let diagram = "classDiagram\n";

  data.forEach(entry => {
    diagram += `    class ${entry.contractName} {\n`;

    entry.elements.forEach(element => {
      if (element.className) {
        diagram += `        + ${element.className}\n`;
      } else if (element.classElements) {
        element.classElements.forEach(classElement => {
          if (classElement.propertyName) {
            diagram += `        - ${classElement.propertyName}: ${classElement.type}\n`;
          } else if (classElement.identifier) {
            diagram += `        + ${classElement.identifier}(${formatParameters(classElement.parameters)}): ${classElement.returnType}\n`;
          }
        });
      }
    });

    diagram += `    }\n`;
  });

  return diagram;
}

function formatParameters(parameters) {
  if (!parameters || parameters.length === 0) {
    return "";
  }

  return parameters.map(param => `${param.identifier}: ${param.type}`).join(", ");
}

// Ejemplo de datos en formato JSON
const jsonData = [
  {
    "contractName": "app",
    "elements": [
      {
        "className": "Utilities",
        "classElements": [
          {
            "type": "Database",
            "propertyName": "database"
          },
          {
            "type": "Framework",
            "propertyName": "framework"
          },
          {
            "returnType": "Utilities",
            "identifier": "constructor",
            "parameters": [
              {
                "type": "Framework",
                "identifier": "framework"
              }
            ]
          }
        ]
      },
      {
        "className": "Database",
        "classElements": [
          {
            "type": "String",
            "propertyName": "host"
          },
          {
            "type": "String",
            "propertyName": "port"
          },
          {
            "type": "String",
            "propertyName": "user"
          },
          {
            "type": "String",
            "propertyName": "password"
          },
          {
            "type": "Framework",
            "propertyName": "framework"
          },
          {
            "returnType": "Database",
            "identifier": "constructor",
            "parameters": [
              {
                "type": "Framework",
                "identifier": "framework"
              },
              {
                "type": "String",
                "identifier": "host"
              },
              {
                "type": "String",
                "identifier": "port"
              },
              {
                "type": "String",
                "identifier": "user"
              },
              {
                "type": "String",
                "identifier": "password"
              }
            ]
          },
          {
            "returnType": "Object",
            "identifier": "schema",
            "parameters": null
          },
          {
            "returnType": "Array",
            "identifier": "select",
            "parameters": [
              {
                "type": "String",
                "identifier": "table"
              },
              {
                "type": "Array",
                "identifier": "where"
              },
              {
                "type": "Array",
                "identifier": "order"
              },
              {
                "type": "Integer",
                "identifier": "page"
              },
              {
                "type": "Integer",
                "identifier": "items"
              },
              {
                "type": "String",
                "identifier": "search"
              }
            ]
          },
          {
            "returnType": "Object",
            "identifier": "insert",
            "parameters": [
              {
                "type": "String",
                "identifier": "table"
              },
              {
                "type": "Object",
                "identifier": "values"
              }
            ]
          },
          {
            "returnType": "Object",
            "identifier": "update",
            "parameters": [
              {
                "type": "String",
                "identifier": "table"
              },
              {
                "type": "Integer",
                "identifier": "id"
              },
              {
                "type": "Object",
                "identifier": "values"
              }
            ]
          },
          {
            "returnType": "Object",
            "identifier": "delete",
            "parameters": [
              {
                "type": "String",
                "identifier": "table"
              },
              {
                "type": "Integer",
                "identifier": "id"
              }
            ]
          }
        ]
      },
      {
        "className": "Framework",
        "classElements": [
          {
            "type": "Utilities",
            "propertyName": "utilities"
          },
          {
            "type": "Database",
            "propertyName": "database"
          },
          {
            "returnType": "Framework",
            "identifier": "constructor",
            "parameters": [
              {
                "type": "Object",
                "identifier": "credentials"
              }
            ]
          }
        ]
      },
      {
        "returnType": "Framework",
        "identifier": "get_framework",
        "parameters": null
      }
    ]
  }
];

// Generar diagrama Mermaid
const mermaidDiagram = generateMermaidDiagram(jsonData);
console.log(mermaidDiagram);
