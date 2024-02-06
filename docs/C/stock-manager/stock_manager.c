#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_PRODUCTS 100
#define MAX_NAME_LENGTH 50

struct Product {
    int id;
    char name[MAX_NAME_LENGTH];
    int quantity;
};

struct Product stock[MAX_PRODUCTS];
int numProducts = 0;

void addProduct() {
    if (numProducts >= MAX_PRODUCTS) {
        printf("No se pueden agregar más productos. Stock completo.\n");
        return;
    }

    struct Product newProduct;
    printf("Ingrese el nombre del producto: ");
    scanf("%s", newProduct.name);
    printf("Ingrese la cantidad del producto: ");
    scanf("%d", &newProduct.quantity);

    newProduct.id = numProducts + 1;
    stock[numProducts] = newProduct;
    numProducts++;

    printf("Producto agregado correctamente.\n");
}

void removeProduct() {
    int productId;
    printf("Ingrese el ID del producto que desea eliminar: ");
    scanf("%d", &productId);

    int found = 0;
    for (int i = 0; i < numProducts; i++) {
        if (stock[i].id == productId) {
            for (int j = i; j < numProducts - 1; j++) {
                stock[j] = stock[j + 1];
            }
            numProducts--;
            found = 1;
            break;
        }
    }

    if (!found) {
        printf("No se encontró ningún producto con ese ID.\n");
    } else {
        printf("Producto eliminado correctamente.\n");
    }
}

void updateQuantity() {
    int productId, newQuantity;
    printf("Ingrese el ID del producto para actualizar la cantidad: ");
    scanf("%d", &productId);

    int found = 0;
    for (int i = 0; i < numProducts; i++) {
        if (stock[i].id == productId) {
            printf("La cantidad actual de %s es %d.\n", stock[i].name, stock[i].quantity);
            printf("Ingrese la nueva cantidad: ");
            scanf("%d", &newQuantity);
            stock[i].quantity = newQuantity;
            found = 1;
            break;
        }
    }

    if (!found) {
        printf("No se encontró ningún producto con ese ID.\n");
    } else {
        printf("Cantidad actualizada correctamente.\n");
    }
}

void displayStock() {
    printf("Lista de productos en stock:\n");
    printf("ID\tNombre\t\tCantidad\n");
    for (int i = 0; i < numProducts; i++) {
        printf("%d\t%s\t\t%d\n", stock[i].id, stock[i].name, stock[i].quantity);
    }
}

int main() {
    int choice;

    while (1) {
        printf("\nGestor de Stock\n");
        printf("1. Agregar Producto\n");
        printf("2. Eliminar Producto\n");
        printf("3. Actualizar Cantidad\n");
        printf("4. Mostrar Stock\n");
        printf("5. Salir\n");
        printf("Ingrese su elección: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                addProduct();
                break;
            case 2:
                removeProduct();
                break;
            case 3:
                updateQuantity();
                break;
            case 4:
                displayStock();
                break;
            case 5:
                printf("Saliendo del programa...\n");
                exit(0);
            default:
                printf("Opción no válida. Por favor, ingrese una opción válida.\n");
        }
    }

    return 0;
}

