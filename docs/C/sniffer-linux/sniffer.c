#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <netinet/ip.h>
#include <netinet/tcp.h>
#include <netinet/udp.h>
#include <netinet/if_ether.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <unistd.h>

#define BUFFER_SIZE 65536

void process_packet(unsigned char *, int);

int main() {
    int sockfd;
    unsigned char buffer[BUFFER_SIZE];

    // Crear un socket RAW para capturar paquetes
    if ((sockfd = socket(AF_PACKET, SOCK_RAW, htons(ETH_P_ALL))) < 0) {
        perror("Error al crear socket");
        exit(EXIT_FAILURE);
    }

    while (1) {
        // Leer datos del socket
        int packet_size = recv(sockfd, buffer, BUFFER_SIZE, 0);
        if (packet_size < 0) {
            perror("Error al recibir datos");
            close(sockfd);
            exit(EXIT_FAILURE);
        }

        // Procesar el paquete recibido
        process_packet(buffer, packet_size);
    }

    close(sockfd);
    return 0;
}

void process_packet(unsigned char *buffer, int size) {
    struct ethhdr *eth = (struct ethhdr *)buffer;
    struct iphdr *ip = (struct iphdr *)(buffer + sizeof(struct ethhdr));

    printf("Paquete recibido: \n");
    printf(" - Protocolo: %d\n", eth->h_proto);
    printf(" - Dirección IP de origen: %s\n", inet_ntoa(*(struct in_addr *)&ip->saddr));
    printf(" - Dirección IP de destino: %s\n", inet_ntoa(*(struct in_addr *)&ip->daddr));
    printf(" - Longitud del paquete: %d\n", size);

    // Si el paquete es TCP, muestra información adicional
    if (ip->protocol == IPPROTO_TCP) {
        struct tcphdr *tcp = (struct tcphdr *)(buffer + sizeof(struct ethhdr) + sizeof(struct iphdr));
        printf(" - Puerto de origen: %d\n", ntohs(tcp->source));
        printf(" - Puerto de destino: %d\n", ntohs(tcp->dest));
    }
}

